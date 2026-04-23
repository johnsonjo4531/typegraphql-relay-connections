import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    description: (
      <>
        TypeGraphQL Relay Connections allows you to easily setup relay
        connection types for your TypeGraphQL server.
      </>
    ),
  },
  {
    title: "Focus on What Matters",
    description: (
      <>
        Just import the types and extend a few classes, and you're ready to go.
      </>
    ),
  },
  {
    title: "Bring your own paging algorithm",
    description: (
      <>
        This library includes types only, so you'll need to make your own paging
        algorithm.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
