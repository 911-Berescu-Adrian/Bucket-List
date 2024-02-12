import express from "express";
import * as DestinationController from "../controllers/DestinationController";

const router = express.Router();

router.get("/", DestinationController.getDestinations);

router.post("/", DestinationController.addDestination);

router.get("/:destinationId", DestinationController.getDestinationById);

router.delete("/:destinationId", DestinationController.deleteDestination);

router.patch("/:destinationId", DestinationController.updateDestination);

export default router;
