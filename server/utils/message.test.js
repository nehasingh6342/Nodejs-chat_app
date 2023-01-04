var expect = require('expect').expect

var {generateMessage, generateLocationMessage} = require('./message');

describe('Generate Message', () => {
    it("should generate correct message object",() => {
        let from = "Test",
        text= 'message from test data'
        message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('Generate Location Message', ()=>{
    it("should generate correct Location object", () =>{
        let from = 'Location Test',
        lat = 15,
        lng= 23,
        url = `https://www.google.com/maps?q=${lat},${lng}`
        message = generateLocationMessage(from, lat, lng );

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});


    });
});