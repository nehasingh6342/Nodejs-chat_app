var expect = require('expect').expect

var {generateMessage} = require('./message');

describe('Generate Message', () => {
    it("should generate correct message object",() => {
        let from = "Test",
        text= 'message from test data'
        message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});