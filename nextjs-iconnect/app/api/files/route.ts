import { promises, writeFileSync } from "fs";
import path from "path";
import { NextResponse } from "next/server"
import { DirItem } from "@/app/lib/definitions";
import { paginate } from "@/app/lib/utils";

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const dirPath = searchParams.get('path') || '/';
    const query = searchParams.get('q');
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 50;
    const results: object[] = [];

    let items = [];
    console.log(dirPath);
    
    try {
        items = await promises.readdir(dirPath);
    } catch (error) {
        return NextResponse.json({message: 'Error accessing path.'}, { status: 400 });
    }

    if (query) {
        items = items.filter(item => item.includes(query));
    }

    for (let item of items) {
        const itemPath = path.join(dirPath, item);
        const itemData: DirItem = {name: item, fullPath: itemPath, ext: path.extname(itemPath), isDir: false};

        const stats = await promises.stat(itemPath);

        itemData.isDir = stats.isDirectory();
        results.push(itemData);
    }

    return NextResponse.json({
        message: 'Fetched successfully.', 
        results: {
            data: paginate(results, Number(page), Number(limit)),
            count: results.length
        }
    }, { status: 200 });
}

export const POST = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const dirPath = searchParams.get('path') || '/';

    try {
    // Parse the form data from the request
    const formData = await request.formData();
    const file = formData.get('file') as File; // 'file' is the field name for the file input

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const filePath = path.join(dirPath, file.name);
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Save the file to the upload directory
    writeFileSync(filePath, fileBuffer);

    return NextResponse.json({ message: 'File uploaded successfully', fileName: file.name });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}