import JSZip from "jszip";

const PROXY = "https://vanillashadereditor.web.app/cors/"

export async function collectZip(url: string) {
    const isGithub = url.indexOf("github.com") !== -1;
    const parts = url.split("/");
    const folderName = parts[parts.length - 1] + "-main";
    if (isGithub) {
        url += "/archive/refs/heads/main.zip";
    }
    const zip = await fetch(PROXY + url.replace("https://", ""), {
        headers: {
            "x-requested-with": "aaa"
        }
    })
        .then(res => res.blob())
        .then(JSZip.loadAsync);

    if (isGithub) {
        return zip.folder(folderName) ?? zip;
    }
    return zip;
}