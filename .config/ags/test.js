const Soup = imports.gi.Soup;
let session = new Soup.Session();

let message = Soup.Message.new('POST', 'http://localhost:6000/ask');
message.set_request('application/json', Soup.MemoryUse.COPY, JSON.stringify({ question: 'Your question here' }), 'Your question here'.length);

session.queue_message(message, function (session, message) {
    // Check the HTTP response status
    if (message.status_code !== 200) {
        print('Failed to get the URL. Status code:', message.status_code);
        return;
    }

    let response = JSON.parse(message.response_body.data);
    print('Answer:', response.answer);
});