import { Request, Response } from "express";

const adController = (service: any) => ({
  getAll(req: Request, res: Response) {
    return service
      .getAll()
      .then((ad: any) => {
        res.status(200).send(ad);
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  },
});

export default adController;
