import express from "express";
import { jwtDecode } from "jwt-decode";
import { JwtToken, UserRole } from "../models/JwtToken";
import "core-js/stable/atob";
import { getLoginForm } from "../controllers/AuthController";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mock = new MockAdapter(axios);

export const allowRoles = (allowedRoles: UserRole[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!req.session.token) {
            res.locals.errormessage = "Please log in";
            res.status(401);
            getLoginForm(req, res);
            return res.status;          
        }

        const decodedToken: JwtToken = jwtDecode(req.session.token);
        if (!allowedRoles.includes(decodedToken.Role)) {
            return res.status(403).send('User role not authorised for this action');
        }
        
        next();
    }
}