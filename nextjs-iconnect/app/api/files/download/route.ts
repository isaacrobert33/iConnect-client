import { existsSync, readFileSync } from "fs";
import { NextResponse } from "next/server"
import path from "path";

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path') || '/';

    if (!existsSync(filePath)) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = readFileSync(filePath);

    const headers = new Headers({
      'Content-Disposition': `attachment; filename=${path.basename(filePath)}`,
      'Content-Type': 'application/octet-stream',
    });

    return new NextResponse(fileBuffer, { headers });
}

