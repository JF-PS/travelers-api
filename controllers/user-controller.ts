import { Request, Response } from "express";

const userController = (business: any) => ({
  signIn(req: Request, res: Response) {
    return business
      .signIn(req.body)
      .then((authUser: void) => {
        res.status(201).send(authUser);
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  },

  signUp(req: Request, res: Response) {
    return business
      .signUp(req.body)
      .then((authUser: any) => {
        res.status(201).send(authUser);
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  },

  validate(req: Request, res: Response) {
    return business
      .validate(req.params)
      .then((authUser: any) => {
        res.status(201).send(authUser);
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  },
});

export default userController;
