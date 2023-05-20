const chinaDivision = require("china-division");
function formatProvince(str) {
    for (let value of chinaDivision.provinces){
        if (value.name.includes(str)){
            return value;
        }else {
            for (let value of chinaDivision.cities){
                if (value.name.includes(str)){
                    let code = value.provinceCode;
                    for (let value of chinaDivision.provinces){
                        if (value.code === code){
                            return value;
                        }
                    }
                }
            }
            for (let value of chinaDivision.areas){
                if (value.name.includes(str)){
                    let code = value.provinceCode;
                    for (let value of chinaDivision.provinces){
                        if (value.code === code){
                            return value;
                        }
                    }
                }
            }
        }
    }
}