
class GpsHelper {
    static formatData(gpsExif) {
        return {
            lat: `${gpsExif.GPSLatitude[0]}.${gpsExif.GPSLatitude[1]}${Math.round(gpsExif.GPSLatitude[2])}`,
            lng: `${gpsExif.GPSLongitude[0]}.${gpsExif.GPSLongitude[1]}${Math.round(gpsExif.GPSLongitude[2])}`
        }
    }
}

module.exports = GpsHelper;
