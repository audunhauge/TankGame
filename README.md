# TankGame
A basic framework for making a simple multiplayer tank shooter game.

No attempt made to compensate for lag, messages sent to server
and rebroadcast with no checks.
The simulation lives on the clients - cheating very easy ...

# Server
A very simple and naive server that just pushes out player positions on change

# Clients
Each client controls a tank that can drive, turn and shoot.
Other players moves are broadcast from server and replayed on all clients.
Your own moves are treated the same way - so if roundtrip is large
you will suffer severe lag.
Intended as an instructional class room game - server on local network.
