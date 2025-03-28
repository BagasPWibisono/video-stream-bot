import { Writable } from "stream";
import { MediaUdp } from "../client/voice/MediaUdp";

class AudioStream extends Writable {
    public udp: MediaUdp;
    public count: number;
    public sleepTime: number;
    public startTime?: number;
    
    constructor(udp: MediaUdp) {
        super();
        this.udp = udp;
        this.count = 0;
        this.sleepTime = 20;
    }

    _write(chunk: any, _: BufferEncoding, callback: (error?: Error | null) => void) {
        this.count++;
        if (!this.startTime)
            this.startTime = Date.now();

        this.udp.sendAudioFrame(chunk);
        
        const next = ((this.count + 1) * this.sleepTime) - (Date.now() - this.startTime);
        setTimeout(() => {
            callback();
        }, next);
    }
}

export {
    AudioStream
};
