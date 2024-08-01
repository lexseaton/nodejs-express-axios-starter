import express from "express";
import { getJobRoles } from "../services/JobRoleService";
import { JwtToken } from "../models/JwtToken";


export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('openJobRoleList.html', { openJobRoles: await getJobRoles(req.session.token) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('openJobRoleList.html');
    }
}