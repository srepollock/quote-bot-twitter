import { add } from "../src";

describe("Add test", () => {
    it("should add 5 + 5 and equal 10", () => {
        let num = add(5, 5);
        expect(num).toBe(10);
    });
    it("should not equal 11 when adding 5 + 5", () => {
        let num = add(5, 5);
        expect(num).not.toBe(11);
    });
});
