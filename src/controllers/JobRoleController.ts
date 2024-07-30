import express from "express";
import { getJobRoles } from "../services/JobRoleService";
import axios, { AxiosResponse } from "axios";

export const URL: string = "/api/openJobRoles/";


export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        
        res.render('openJobRoleList.html', { openJobRoles: await getJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('openJobRoleList.html');
    }
}