import axios from "axios";
import React, { useState } from "react";

interface GeocodingFormProps {
  isSubmitting: boolean;
  query: string;
  onSubmit(e: any): any;
  onChange(name: string, value: string | boolean): any;
}

interface FormState {
  query: string;
  isSubmitting: boolean;
  response: any;
}

const GeocodingForm: React.FC<GeocodingFormProps> = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [data, setData] = useState([]);
  const [formState, setFormState] = useState<FormState>({
    query: "",
    isSubmitting: false,
    response: {},
  });

  const handleChange = (key: keyof FormState, value: string | boolean) => {
    setFormState((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const queryInfo = encodeURIComponent(formState.query);

  const handleGeoLocation = () => {
    const geolocation = navigator.geolocation;

    const p = new Promise((resolve, reject) => {
      if (!geolocation) {
        throw new Error("Not Supported");
      }

      setIsLocating(true);
      geolocation.getCurrentPosition(
        (position) => {
          console.log("Location found");
          console.log({ location: position });
          resolve(position);
        },
        () => {
          console.log("Location : Permission denied");
          reject(new Error("Permission Denied"));
        }
      );
    });

    p.then((location: any) => {
      setIsLocating(false);
      handleChange(
        "query",
        location.coords.latitude + ", " + location.coords.longitude
      );
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setFormState({
      ...formState,
      query: value
    })
  };

  const getLocation = (queryInfo: string) => {
    return axios.get(
      `https://api.opencagedata.com/geocode/v1/json?key=4bef3a5ba38d406696153025d30d0a82&q=${queryInfo}&no_annotations=1&pretty=1&countrycode=ug&address_only=1&road_info=1`
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormState((prevState: any) => ({
      ...prevState,
      isSubmitting: true,
    }));

    const response = await getLocation(queryInfo);
    // Parse and process the response data as needed
    const data = response.data.results;
    console.log({ data: data });
    setFormState({
      ...formState,
      response: data
    })

    setData(data);
  };

  return (
    <div className="box form">
      <form onSubmit={handleSubmit}>
        {/* <!-- Query --> */}
        <div className="field">
          <label className="label">Address or Coordinates</label>
          <div className="control has-icons-left">
            <span className="icon is-small is-left">
              <i className="fas fa-map-marked-alt" />
            </span>
            <input
              name="query"
              type="text"
              placeholder="location"
              value={formState.query}
              onChange={handleInputChange}
            />
            <div className="help">
              Address, place name
              <br />
            </div>
          </div>
        </div>
        {/* <!-- ./Query --> */}
        <div className="field">
          <label className="label">Show my location</label>
          <div className="bg-zinc-80" onClick={handleGeoLocation}>
            {!isLocating && (
              <button className="button is-static">
                <span className="icon is-small">my location</span>
              </button>
            )}
            {isLocating && (
              <button className="button is-static">
                <span className="icon is-small">
                  <i className="fas fa-spinner fa-pulse" />
                </span>
              </button>
            )}
          </div>
        </div>
        {/* <!-- Button Geocode --> */}
        <button
          className="button is-success"
          disabled={isLocating || formState.isSubmitting}
        >
          Submit location
        </button>
        {/* <!-- ./Button Geocode --> */}
      </form>
    </div>
  );
};

export default GeocodingForm;
