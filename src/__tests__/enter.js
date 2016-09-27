import enter from '../enter';

describe('enter', () => {
    it('should return a function of arity 3', () => {
        const fn = enter(() => {});
        expect(fn instanceof Function).toEqual(true);
        expect(fn.length).toEqual(3);
    });

    describe('generated function', () => {
        const operation = jest.fn();

        beforeEach(() => {
            operation.mockClear();
            operation.mockImplementation(() => Promise.resolve());
        });

        it('should invoke the specified operation with the specified nextState and replace parameters', () => {
            const nextState = {};
            const replace = () => {};
            enter(operation)(nextState, replace, () => {});
            expect(operation.mock.calls.length).toEqual(1);
            [nextState, replace].forEach((expected, index) => expect(operation.mock.calls[0][index]).toBe(expected));
        });

        describe('after the specified operation is successful', () => {
            it('should invoke the callback with no parameters', async () => {
                const callback = jest.fn();
                enter(operation)(null, null, callback);
                await new Promise(resolve => callback.mockImplementationOnce(() => resolve()));
                expect(callback).toBeCalledWith();
            });
        });

        describe('after the specified operation fails', () => {
            beforeEach(() => operation.mockImplementationOnce(() => Promise.reject()));

            it('should invoke the callback with an error', async () => {
                const callback = jest.fn();
                enter(operation)(null, null, callback);
                await new Promise(resolve => callback.mockImplementationOnce(() => resolve()));
                expect(callback.mock.calls.length).toEqual(1);
                expect(callback.mock.calls[0][0] instanceof Error).toEqual(true);
            });
        });
    });
});
