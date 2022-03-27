import { Request, Response } from "express";

const userController = (service: any) => ({
  signIn(req: Request, res: Response) {
    return service
      .signIn(req.body)
      .then((response: any) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        } else {
          res.status(200).json({ user: response.result });
        }
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  },

  signUp(req: Request, res: Response) {
    return service
      .signUp(req.body)
      .then((response: any) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        } else {
          res.status(201).json({ user: response.result });
        }
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  },

  validate(req: Request, res: Response) {
    const { token } = req.params;
    return service
      .validate(token)
      .then((response: any) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        } else {
          res.status(200).json({ user: response.result });
        }
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  },

  forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    return service
      .forgotPassword(email)
      .then((response: any) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        } else {
          res.status(200).json(response);
        }
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  },

  newPassword(req: Request, res: Response) {
    const { password } = req.body;
    const { token } = req.params;
    return service
      .newPassword(token, password)
      .then((response: any) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        } else {
          res.status(200).json({ user: response.result });
        }
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  },
});

export default userController;
