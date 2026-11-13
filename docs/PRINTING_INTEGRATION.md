# Brightdesk Forms printing integration

Forms bundles the dependency-free Brightdesk Printing adapter snapshot from `conz20/Brightdesk-Printing`. The source revision is recorded in `src/printing-package/UPSTREAM.json`.

The Electron main process creates an adapter per `webContents` and registers sender-authorized IPC for configured queue listing, network discovery, user-selected WSD pairing, capabilities, system printer settings and print submission. The context-isolated preload exposes only the six printing operations.

Print submission uses Electron's visible operating-system print dialog. Brightdesk does not silently create queues, install drivers, pair printers or upload document contents.

## Platform integration

- macOS compiles the Bonjour/IPP discovery helper with Swift and declares Bonjour services plus local-network permission text.
- Windows compiles the IPP/WSD helper using Visual Studio C++ Build Tools and the Windows SDK.
- Linux uses configured Electron printer queues and host CUPS `ippfind` for network discovery.

Native helpers are compiled on their matching operating-system runner and unpacked outside ASAR. A found printer is not automatically a usable queue. Submission acceptance does not prove that paper was printed.

Virtual-printer tests verify the adapter contract without hardware. They do not replace Windows/Linux native builds or real-printer checks.
