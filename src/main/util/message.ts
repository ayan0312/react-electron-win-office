export default class Message {
    private data: Buffer;
    private write: boolean;
    private pointer: number;

    constructor(buffer: Buffer) {
        if (buffer) {
            this.data = buffer;
            this.write = false;
        } else {
            this.data = Buffer.alloc(0);
            this.write = true;
        }
        this.pointer = 0;
    }

    int8(val: any) {
        return this.write ? this.write8(val) : this.read8();
    }
    int32(val: any) {
        return this.write ? this.write32(val) : this.read32();
    }
    str(val: any) {
        return this.write ? this.writeStr(val) : this.readStr();
    }
    rawHexStr(val: any) {
        return this.write ? this.writeRawHexStr(val) : this.readRawHexStr(val);
    }

    size() {
        return this.data.length;
    }
    seek(val: any) {
        this.pointer += val;
    }

    write8(val: any) {
        const b = Buffer.alloc(1);
        b.writeUInt8(val, 0);
        this.data = Buffer.concat([this.data, b]);
        this.pointer += 1;
        return this;
    }
    write32(val: any) {
        const b = Buffer.alloc(4);
        b.writeUInt32LE(val, 0);
        this.data = Buffer.concat([this.data, b]);
        this.pointer += 4;
        return this;
    }
    writeStr(val: any) {
        // convert to buff
        let b = Buffer.from(val, 'utf8');
        const s = Buffer.alloc(4);
        s.writeUInt32LE(b.length, 0);
        // write length
        b = Buffer.concat([s, b]);
        // write text
        this.data = Buffer.concat([this.data, b]);
        return this;
    }

    writeRawHexStr(val: any) {
        const b = Buffer.from(val, 'hex');
        this.data = Buffer.concat([this.data, b]);
        this.pointer += b.length;
        return this;
    }

    writeBuffer(buff: any) {
        this.data = Buffer.concat([this.data, buff]);
        this.pointer += buff.length;
        return this;
    }

    read8() {
        const val = this.data.readUInt8(this.pointer);
        this.pointer += 1;
        return val;
    }
    read32() {
        const val = this.data.readUInt32LE(this.pointer);
        this.pointer += 4;
        return val;
    }
    readStr() {
        const size = this.data.readUInt32LE(this.pointer);
        this.pointer += 4;
        const str = this.data.toString('utf8', this.pointer, this.pointer + size);
        this.pointer += size;
        return str;
    }

    readRawHexStr(size: any) {
        const str = this.data.toString('hex', this.pointer, this.pointer + size);
        this.pointer += size;
        return str;
    }

    getBuff() {
        const b = Buffer.alloc(4);
        b.writeUInt32LE(this.data.length, 0);
        this.data = Buffer.concat([b, this.data]);
        this.write = false;
        return this.data;
    }
}
