import { Formik, Form, Field } from "formik";
import { useState } from "react";
import "./header.css";
import "./article.css";
import "./content.css";

const App = () => {
  const [photos, setPhotos] = useState();
  console.log({ photos });
  const open = (url) => window.open(url);
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID gsMpQImGXN-jymD7BGizsBZXGC-FoVGaXVSxXhuYhEo",
                },
              }
            );
            const data = await response.json();
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div class="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
