const instructorHelper = require('../helpers/instructorHelper');

//in - post
const inDateTime = async (req, res) => {
    try {
        console.log(req.body)
        console.log("/////////////////////////")
        const insId = "abcd";
        //    const addedData= await instructorHelper.addNewIns(insId,req.body)
        console.log("...................")
        const ins = await instructorHelper.findInstructor(insId);
        if (ins) {
            console.log(ins)
            if (ins.attendance[0].out) {
                const addedData = await instructorHelper.addInData(insId, req.body)
            }else{
                console.log("need to out")
            }
        } else {
            const addedData = await instructorHelper.addNewIns(insId, req.body)

        }
    } catch (err) {

    }

}


module.exports = {
    inDateTime
}