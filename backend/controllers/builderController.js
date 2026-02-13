import con from "../db/config.js";
import { getUserComponentsQuery } from "../utils/queries.js";
import { getUserPagesQuery } from "../utils/queries.js";


// Pages
const getPages = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await con.promise().query(getUserPagesQuery, [userId]);

        res.json({result : result.rows || []});
    }catch(error){
        res.status(500).json({
            message: "error fetching file"
        });
    }
}

const savePage = async (req, res) => {

}



// Custom Components
const getCustomComponents = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await con.promise().query(getUserComponentsQuery, [userId]);

        res.json({result : result.rows || []});
    } catch (error) {
        res.status(500).json({
            message: "error fetching file"
        });
    }
}

const saveCustomComponent = async (req, res) => {

}



export { getPages, savePage, getCustomComponents, saveCustomComponent };
