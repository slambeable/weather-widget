import InfoAboutGeolocationPositionInterface
  from '@/types/geoPosition/InfoAboutGeolocationPositionInterface';

type ErrorHandler = {
  (geolocationErrorInterface: Error): void;
};

class GeoPositionManager {
  private static instance: GeoPositionManager = new GeoPositionManager();

  private currentPosition = {
    lat: null as null | number,
    lon: null as null | number,
  };

  private geolocation = navigator.geolocation;

  private constructor() {
    GeoPositionManager.instance = this;
  }

  public static getInstance(): GeoPositionManager {
    return GeoPositionManager.instance;
  }

  public getCurrentPosition() {
    return this.currentPosition;
  }

  private getPosition() {
    return new Promise((resolve, reject) => {
      this.geolocation
        .getCurrentPosition(resolve, reject);
    });
  }

  private setUserPositionResolveHandler(position: InfoAboutGeolocationPositionInterface) {
    this.currentPosition = {
      lon: position.coords.longitude,
      lat: position.coords.latitude,
    };
  }

  public async giveCurrentUserPosition(
    isLocalStorageCities: boolean,
    errorHandler: ErrorHandler,
  ) {
    try {
      const position = await this.getPosition() as InfoAboutGeolocationPositionInterface;

      if (isLocalStorageCities) {
        this.setUserPositionResolveHandler(position);
      }
    } catch (error) {
      const geolocationError = error as Error;

      if (isLocalStorageCities) {
        errorHandler(geolocationError);
      }

      console.error(geolocationError.message);
    }
  }
}

export default GeoPositionManager;
