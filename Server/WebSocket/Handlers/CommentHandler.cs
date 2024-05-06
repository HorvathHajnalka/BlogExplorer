using System.Net.WebSockets;
using System.Text;

namespace BlogExp.WebSocket.Handlers
{
    public class CommentHandler : WebSocketHandler
    {
        public CommentHandler(ConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
        {
        }

        public override async Task ReceiveAsync(System.Net.WebSockets.WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);

            await SendMessageToAllAsync(message);
        }
    }
}
