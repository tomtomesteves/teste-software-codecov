const {
    getHistory,
    printHistory,
    getOutput,
    printOutput,
    getFormattedNumber,
    reverseNumberFormat,
} = require("../script");

describe("Calculator functions", () => {

    describe("printHistory", () => {
        it("sets the value of the element with id 'history-value'", () => {
            document.body.innerHTML = '<div id="history-value"></div>';
            printHistory("456");
            expect(document.getElementById("history-value").innerText).toBe("456");
        });
    });

    describe("printOutput", () => {
        it("sets the formatted value of the element with id 'output-value'", () => {
            document.body.innerHTML = '<div id="output-value"></div>';
            printOutput("12345");
            expect(document.getElementById("output-value").innerText).toBe("12,345");
        });

        it("sets the value of the element with id 'output-value' to empty string when the argument is empty", () => {
            document.body.innerHTML = '<div id="output-value">123</div>';
            printOutput("");
            expect(document.getElementById("output-value").innerText).toBe("");
        });
    });

    describe("getFormattedNumber", () => {
        it("returns a string with the number formatted with commas as thousands separators", () => {
            expect(getFormattedNumber("1234567")).toBe("1,234,567");
        });

        it("returns an empty string if the argument is '-'", () => {
            expect(getFormattedNumber("-")).toBe("");
        });
    });

    describe("reverseNumberFormat", () => {
        it("returns a number with commas as thousands separators removed", () => {
            expect(reverseNumberFormat("1,234,567")).toBe(1234567);
        });
    });
});