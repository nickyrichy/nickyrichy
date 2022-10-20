$(document).ready(function () {
    var webURL = window.location.href;
    var splitFlag = "http://";
    if (webURL.substring(0, 5) == "https") {
        splitFlag = "https://";
    }
    var user = webURL.split(splitFlag)[1].split(".")[0];
    //user = 'nickyrichy';
    blogListURL = 'https://api.github.com/repos/' + user + '/' + user + '.github.io/contents/notes';

    //set Blog list
    $.getJSON(blogListURL, function (json) {

        var name = json[0].name; // Blog title


        var blogURL = json[0].download_url; //Blog Raw Url

        var type = "markdown";
        if (name.substr(-5, 5) == ".html") {
            name = name.substr(0, name.length - 5);
            type = "html";
        }

        // set blog content
        $.get(blogURL, function (result) {
            $("#title").show();
            if (type == "markdown") {

                $("#article").html("");

                testEditormdView = editormd.markdownToHTML("article", {
                    markdown: result, //+ "\r\n" + $("#append-test").text(),
                    // htmlDecode: true, // 开启 HTML 标签解析，为了安全性，默认不开启
                    htmlDecode: "style,script,iframe", // you can filter tags decode
                    //toc             : false,
                    tocm: true, // Using [TOCM]
                    tocContainer: "#custom-toc-container", // 自定义 ToC 容器层
                    //gfm             : false,
                    //tocDropdown     : true,
                    // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
                    emoji: true,
                    taskList: true,
                    tex: true, // 默认不解析
                    flowChart: true, // 默认不解析
                    sequenceDiagram: true, // 默认不解析

                    onscroll: function (event) {
                        console.clear();
                        console.log("onscroll =>", this, this.id, this.settings, event);
                    },

                    onpreviewscroll: function (event) {
                        console.clear();
                        console.log("onpreviewscroll =>", this, this.id, this.settings, event);
                    },

                    onload: function () {
                        this.off("previewscroll"); // unbind before handle

                        // Override settings.onpreviewscroll
                        this.on("previewscroll", function () {
                            console.clear();
                            console.log("on() => Override settings.onpreviewscroll =>", this, this.id, event, (new Date).getTime());
                        });

                        // defined event bind
                        this.on("resize", function () {
                            console.clear();
                            console.log("onresize =>", this, this.id, event, (new Date).getTime());
                        });
                    }
                });

            } else {

                $("#article").html(result);
            }

        });
    });

})
