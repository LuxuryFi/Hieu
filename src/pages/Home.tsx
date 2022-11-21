import {
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonRouterLink,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import { useState } from 'react';
import { insertTrip } from '../databaseHandler';
import { Trip } from '../models/Trip';

import './Home.css';

const Home: React.FC = () => {
  const [tripName, setTripName] = useState<string>('');
  const [reporterName, setReporterName] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [riskyAssessment, setRiskyAssessment] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tripDate, setTripDate] = useState<string>();
  const [tripTime, setTripTime] = useState<string>();

  const saveHandler = async () => {
    const newTrip: Trip = {
      trip_name: tripName,
      destination: destination,
      description: description,
      risky_assessment: riskyAssessment,
      date: tripDate,
      time: tripTime,
    };

    try {
      await insertTrip(newTrip);
      alert('Trip was created!');
    } catch (err) {
      console.log(err);
    }
  };

  const dateSelectedHandler = (e: any) => {
    const chooseDate = new Date(e.detail.value);
    setTripTime(chooseDate.toLocaleTimeString());
    setTripDate(chooseDate.toLocaleDateString('en-GB'));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>M-Expense Ionic</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Trip Name */}
        <IonItem>
          <IonLabel position="floating">Trip Name</IonLabel>
          <IonInput
            onIonChange={(e) => setTripName(e.detail.value!)}
          ></IonInput>
          <IonText className="text-error trip">
            Please enter your trip name!
          </IonText>
        </IonItem>

        {/* Destination */}
        <IonItem>
          <IonLabel position="floating">Destination</IonLabel>
          <IonInput
            onIonChange={(e) => setDestination(e.detail.value!)}
          ></IonInput>
          <IonText className="text-error destination">
            Please enter your destination!
          </IonText>
        </IonItem>

        {/* Description */}
        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput
            onIonChange={(e) => setDescription(e.detail.value!)}
          ></IonInput>
          <IonText className="text-error description">
            Please enter your description!
          </IonText>
        </IonItem>

        {/* Date */}
        <IonItem>
          <IonLabel position="floating">Date and Time</IonLabel>
          <IonInput value={tripDate} id="tripDate"></IonInput>
          <IonPopover
            keepContentsMounted={true}
            trigger="tripDate"
            triggerAction="click"
          >
            <IonDatetime onIonChange={(e) => dateSelectedHandler(e)}>
              {' '}
            </IonDatetime>
          </IonPopover>
          <IonText className="text-error date">
            Please select your date and time!
          </IonText>
        </IonItem>

        {/* Risk */}
        <IonList>
          <IonItem>
            <IonLabel position="floating">Risk</IonLabel>
            <IonSelect
              placeholder="Select risky assessment"
              onIonChange={(e) => setRiskyAssessment(e.detail.value)}
            >
              <IonSelectOption value="Yes">Yes</IonSelectOption>
              <IonSelectOption value="No">No</IonSelectOption>
            </IonSelect>
            <IonText className="text-error risky">
              Please enter your risky assessment!
            </IonText>
          </IonItem>
        </IonList>

        <IonButton expand="block" class="ion-margin" onClick={saveHandler}>
          Save
        </IonButton>

        <IonRouterLink className="link-btn" routerLink="/trips">
          Go to list trip page
        </IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default Home;
