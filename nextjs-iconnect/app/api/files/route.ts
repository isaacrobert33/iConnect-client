import { readdir, stat, promises } from "fs";
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

export const POST = (request: Request) => {
    return NextResponse.json({message: 'Fetched successfully.'}, { status: 201 });
}