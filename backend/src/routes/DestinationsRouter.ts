import express from "express";
import * as DestinationsController from "../controllers/DestinationsController";

const router = express.Router();

router.get("/", DestinationsController.getDestinations);

router.post("/", DestinationsController.addDestination);

router.get("/:destinationId", DestinationsController.getDestinationById);

router.delete("/:destinationId", DestinationsController.deleteDestination);

router.patch("/:destinationId", DestinationsController.updateDestination);

export default router;
