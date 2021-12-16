const { jsPDF } = window.jspdf;

const has_ptt = document.querySelector("#pptContainer") !== null;

const has_download = document.querySelector("#xtop-inline > div.module.mod_media.mod_media-docTitle > div.fs-page-header.hidden-xs.hidden-sm > h2 > div.ext.hidden-xs.hidden-sm.fs-normal.clearfix > div:nth-child(2) > span.fs-tools > ul > li > a") !== null;

function ppt2pdf() {
    let all_img = document.querySelectorAll("#pptContainer img");
    const width = all_img[0].naturalWidth;
    const height = all_img[0].naturalHeight;
    let doc = new jsPDF('l', 'px', [width, height]);
    for (let i = 0; i < all_img.length; ++i) {
        doc.setPage(i + 1);
        doc.addImage(all_img[i], "jpg", 0, 0, width, height);
        if (i !== all_img.length - 1) doc.addPage();
    }
    doc.save(`${document.title.split("|")[0].replaceAll(/\.|\//g, "_").trim()}.pdf`);
}

if (has_ptt && !has_download){
    let download_btn = document.createElement("button");
    download_btn.className = "btn btn-default";
    download_btn.innerText = "Download PDF";
    download_btn.addEventListener('click', () => ppt2pdf());
    let li_container = document.createElement("li");
    li_container.appendChild(download_btn);
    document.querySelector("#xtop-inline > div.module.mod_media.mod_media-breadcrumb > div > ol").appendChild(li_container);
}