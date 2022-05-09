// ==UserScript==
// @name        eeclass ppt2pdf downloader
// @description Append download link to any course ppt
// @match       *://ncueeclass.ncu.edu.tw/media/doc/*
// @require     https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js
// @version     2022.05
// @updateURL   https://raw.githubusercontent.com/lebr0nli/eeclass-ppt2pdf-dl/main/userscripts/eeclass-ppt2pdf-dl.user.js
// ==/UserScript==

try {
    if (window.jspdf === undefined) {
        throw 'jsPDF did not import successfully, reload the page if this is your first time running the extension';
    }
    const { jsPDF } = window.jspdf;

    const has_ptt = document.querySelector("#pptContainer") !== null;

    const has_download = document.querySelector("#xtop-inline > div.module.mod_media.mod_media-docTitle > div.fs-page-header.hidden-xs.hidden-sm > h2 > div.ext.hidden-xs.hidden-sm.fs-normal.clearfix > div:nth-child(2) > span.fs-tools > ul > li > a") !== null;

    function ppt2pdf() {
        alert('Please be patient, the pdf is generating now...')
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

    if (has_ptt && !has_download) {
        let download_btn = document.createElement("button");
        download_btn.className = "btn btn-default";
        download_btn.innerText = "Download PDF";
        download_btn.addEventListener('click', () => ppt2pdf());
        let li_container = document.createElement("li");
        li_container.appendChild(download_btn);
        document.querySelector("#xtop-inline > div.module.mod_media.mod_media-breadcrumb > div > ol").appendChild(li_container);
        alert("The download button is generated successfully, rotate your mobile device if you didn't see it");
    }
} catch (e) {
    alert(e);
    alert('Contact @lebr0nli at https://github.com/lebr0nli/eeclass-ppt2pdf-dl/issues for help');
}

