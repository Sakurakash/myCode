let fs = require("fs");
let path = require("path");
class project {
    constructor(projectPath, projectName) {
        this.projectPath = path.join(projectPath, projectName);
        this.projectName = projectName;
        this.subFiles = ["images", "css", "js", "index.html"];
    }
    createProject(){
        // 创建项目文件目录
        fs.mkdirSync(this.projectPath);
        // 创建项目子文件目录
        let projectPath = this.projectPath;
        this.subFiles.forEach(function (fileName) {
            let filePath = path.join(projectPath, fileName);
            if (!path.extname(filePath)){
                fs.mkdirSync(filePath);
            }else {
                fs.writeFileSync(filePath, "");
            }
        });
    }
}
let newProject = new project(__dirname, "project");
newProject.createProject();