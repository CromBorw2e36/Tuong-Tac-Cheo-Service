window.onload = async() => {
    const manifest = await chrome.runtime.getManifest();
    const name = manifest.name;
    const version = manifest.version;
    const description = manifest.description;
    const create_date = manifest.create_date;
    const author = manifest.author;
    const modify_date = manifest.modify_date;
    const build = manifest.build;

    document.getElementById('name').textContent = name;
    document.getElementById('description').innerText = `${description}`;
    document.getElementById('version').textContent = version;
    document.getElementById('create_date').textContent = create_date;
    document.getElementById('author').textContent = author;
    document.getElementById('modify_date').textContent = modify_date;
    document.getElementById('build').textContent = build;
}