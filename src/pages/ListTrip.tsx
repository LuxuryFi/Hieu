import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { pencil, trash } from 'ionicons/icons';

import { deleteTrip1, getAllTrips } from '../databaseHandler';
import { Trip } from '../models/Trip';

const Setting: React.FC = () => {
  const [alltrips, setAllTrips] = useState<Trip[]>([]);
  const fetchData = async () => {
    const data = await getAllTrips();
    setAllTrips(data);
  };

  const deleteTrip = (id: number) => {
    console.log(id);
    const is_deleted = deleteTrip1(id);
      console.log('a')
    fetchData();
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTrips();
      setAllTrips(data);
    };
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>M-Expense Ionic</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1 className="link-btn">List Trip Page</h1>
        <IonList>
          {alltrips.map((trip) => (
            <IonItem key={trip.id} className="item">
              <IonLabel>

                <IonLabel className="label">
                  <b>Activity Name</b>: {trip.trip_name}
                </IonLabel>
                <IonLabel className="label">
                  <b>Description</b>: {trip.description}
                </IonLabel>
                <IonLabel className="label">
                  <b>Risk</b>: {trip.risky_assessment}
                </IonLabel>
                <IonLabel className="label">
                  <b>Destination</b>: {trip.destination}
                </IonLabel>
                <IonLabel className="label">
                  <b>Date</b>: {trip.date}
                </IonLabel>
              </IonLabel>
              <IonButtons slot="end">
                <IonRouterLink routerLink={`/detail/${trip.id}`}>
                  <IonButton color="primary" className="btn" fill="solid">
                    <IonIcon className="icon" icon={pencil}></IonIcon>
                  </IonButton>
                </IonRouterLink>

                <IonButton
                  onClick={() => deleteTrip(trip.id ? trip.id : 0)}
                  color="medium"
                  className="btn"
                  fill="solid"
                >
                  <IonIcon className="icon" icon={trash}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonItem>
          ))}
        </IonList>

        <IonRouterLink className="link-btn" routerLink="/home">
          Go to Home page
        </IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
