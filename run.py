#Use to create local host
import http.server
import socketserver

PORT = 1337

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
      ".js": "application/javascript",
});

httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Running on http://localhost:{PORT}")
httpd.serve_forever()