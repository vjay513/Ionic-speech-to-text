import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  matches: string[];
  isRecording = false;

  constructor(private speechRecognition: SpeechRecognition,
              private cd: ChangeDetectorRef  ) { }

  startListening() {
    const options = {
      language: 'en-US'
    };
    this.speechRecognition.startListening().subscribe((matches) => {
      this.matches = matches;
      this.cd.detectChanges();

    });
    this.isRecording = true;
  }

  getPermissions() {
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if (!hasPermission) {
        this.speechRecognition.requestPermission();
      }
    });
  }
  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }



}
