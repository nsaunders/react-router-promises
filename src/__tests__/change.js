import change from '../change';

describe('change', () => {
    it('should return a function of arity 4', () => {
        const fn = change(() => {});
        expect(fn instanceof Function).toEqual(true);
        expect(fn.length).toEqual(4);
    });

    describe('generated function', () => {
        const operation = jest.fn();

        beforeEach(() => {
            operation.mockClear();
            operation.mockImplementation(() => Promise.resolve());
        });

        it('should invoke the specified operation with the specified state and replace parameters', () => {
            const prevState = {};
            const nextState = {};
            const replace = () => {};
            change(operation)(prevState, nextState, replace, () => {});
            expect(operation.mock.calls.length).toEqual(1);
            [nextState, replace, prevState]
                .forEach((expected, index) => expect(operation.mock.calls[0][index]).toBe(expected));
        });

        describe('after the specified operation is successful', () => {
            it('should invoke the callback with no parameters', async () => {
                const callback = jest.fn();
                change(operation)(null, null, null, callback);
                await new Promise(resolve => callback.mockImplementationOnce(() => resolve()));
                expect(callback).toBeCalledWith();
            });
        });

        describe('after the specified operation fails', () => {
            beforeEach(() => operation.mockImplementationOnce(() => Promise.reject()));

            it('should invoke the callback with an error', async () => {
                const callback = jest.fn();
                change(operation)(null, null, null, callback);
                await new Promise(resolve => callback.mockImplementationOnce(() => resolve()));
                expect(callback.mock.calls.length).toEqual(1);
                expect(callback.mock.calls[0][0] instanceof Error).toEqual(true);
            });
        });
    });
});
