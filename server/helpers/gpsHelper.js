
class GpsHelper {
    static formatData(gpsExif) {
        const coords = {};

        coords.lat = `${gpsExif.GPSLatitude[0]}.${gpsExif.GPSLatitude[1]}${Math.round(gpsExif.GPSLatitude[2])}`;
        coords.lng = `${gpsExif.GPSLongitude[0]}.${gpsExif.GPSLongitude[1]}${Math.round(gpsExif.GPSLongitude[2])}`;

        if(gpsExif.GPSLatitudeRef === 'S') {
            coords.lat = -coords.lat
        }

        if(gpsExif.GPSLongitudeRef === 'W') {
            coords.lng = -coords.lng
        }

        return coords
    }
}

module.exports = GpsHelper;
