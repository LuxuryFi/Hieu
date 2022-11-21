import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getTripById, updateTrip } from '../databaseHandler';
import { Param } from '../models/Param';
import { Trip } from '../models/Trip';
import './TripDetail.css';

const TripDetail: React.FC = () => {
  const param: Param = useParams();
  const [trip, setTrip] = useState<Trip>({
    trip_name: '',
    destination: '',
    description: '',
    risky_assessment: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    const fetchTripById = async (id: number) => {
      const data = await getTripById(id);
      // console.log(data);
      setTrip(data);
    };
    fetchTripById(+param.id);
  }, [param.id]);

  const dateSelectedHandler = (e: any) => {
    const selectedDate = new Date(e.detail.value);
    setTrip({
      ...trip,
      time: selectedDate.toLocaleTimeString(),
      date: selectedDate.toLocaleDateString('en-GB'),
    });
  };


  const handleUpdate = () => {
    const updateNewTrip = async () => {
      const id = await updateTrip(trip);
      alert(id);
    };

    updateNewTrip();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>M-Expense Ionic</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1 className="link-btn">Trip Detail</h1>

        <IonList>
          {/* Trip Name */}
          <IonItem>
            <IonLabel position="floating">Trip name</IonLabel>
            <IonInput
              value={trip.trip_name}
              onIonChange={(e) => {
                const newTripName =
                  e.detail.value !== null ? e.detail.value : '';
                setTrip({ ...trip, trip_name: newTripName });
              }}
              placeholder="Enter reporter name"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Destination</IonLabel>
            <IonInput
              value={trip.destination}
              onIonChange={(e) => {
                const newDes =
                  e.detail.value !== null ? e.detail.value : '';
                setTrip({ ...trip, destination: newDes });
              }}
              placeholder="Enter your destination"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput
              value={trip.description}
              onIonChange={(e) => {
                const newDescription =
                  e.detail.value !== null ? e.detail.value : '';
                setTrip({ ...trip, description: newDescription });
              }}
              placeholder="Enter description"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Date and Time</IonLabel>
            <IonInput value={trip.date} id="tripDetailDate"></IonInput>
            <IonPopover
              keepContentsMounted={true}
              trigger="tripDetailDate"
              triggerAction="click"
            >
              <IonDatetime
              onIonChange={(e) => dateSelectedHandler(e)}>
                {' '}
              </IonDatetime>
            </IonPopover>
          </IonItem>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Risk</IonLabel>
              <IonSelect
                value={trip.risky_assessment}
                placeholder="Select risk"
              >
                <IonSelectOption value="Yes">Yes</IonSelectOption>
                <IonSelectOption value="No">No</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <IonButton
            color="primary"
            class="ion-margin"
            fill="solid"
            onClick={handleUpdate}
          >
            Update
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TripDetail;
