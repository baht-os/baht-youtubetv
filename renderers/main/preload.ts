/**
 * BAHT: the only bridge between the YouTube page and the main process (context isolation is on).
 * The offline banner reports that the network is back; nothing else is exposed.
 */
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ytv', {
    restored: () => ipcRenderer.send('restored'),
});
