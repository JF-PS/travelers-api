import { Request, Response } from "express";

const adController = (service: any) => ({
  create(req: Request, res: Response) {
    const { vehicle, ad } = req.body;
    return service
      .create(vehicle, ad)
      .then((response: any) => {
        if (response.errorMessage != null) {
          res.status(412).json(response.errorMessage);
        } else {
          res.status(201).json({ ad: response.result });
        }
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  },

  getAll(req: Request, res: Response) {
    return service
      .getAll(req.query)
      .then((response: any) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        } else {
          res.status(201).json({ ads: response.result });
        }
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  },

  getOne(req: Request, res: Response) {
    const { id } = req.params;
    return service
      .getOne(id)
      .then((response: any) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        } else {
          res.status(201).json({ ad: response.result });
        }
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  },

  deleteOne(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req.body;
    return service
      .deleteOne(id, user_id)
      .then((response: any) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        } else {
          res.status(204).json({ ad: response.result });
        }
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  },

  async updateOne(req: Request, res: Response) {
    const { id } = req.params;
    const { ad, user_id } = req.body;
    return service
      .updateOne(id, ad, user_id)
      .then((response: any) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        } else {
          res.status(200).json({ ad: response.result });
        }
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  },
});

export default adController;
