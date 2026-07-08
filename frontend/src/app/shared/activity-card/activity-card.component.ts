import { Component, Input } from '@angular/core';
import { Activity } from '../../models/activity.model';

const WIKIMEDIA_BASE = 'https://commons.wikimedia.org/wiki/Special:FilePath/';

const CATEGORY_IMAGES: Record<string, string> = {
  'Environment': WIKIMEDIA_BASE + 'Beach_Cleaning_Volunteers.jpg?width=500',
  'Education': WIKIMEDIA_BASE + 'A_Volunteer_making_a_poster_with_students.jpg?width=500',
  'Elderly Care': WIKIMEDIA_BASE + 'Nursing_home.JPG?width=500',
  'Animal Welfare': WIKIMEDIA_BASE + 'US_Navy_090704-N-1062H-073_Air_Traffic_Controller_1st_Class_Luke_Wray_plays_with_Cruiser,_a_dog_at_the_Dogs_Refuge_Home,_during_a_community_service_project.jpg?width=500'
};

const DEFAULT_IMAGE = WIKIMEDIA_BASE + 'Ray_LaHood_Habitat_for_Humanity_2009_131156.jpg?width=500';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.css']
})
export class ActivityCardComponent {
  @Input() activity!: Activity;
  @Input() linkPrefix = '/employee/activities';

  get slotsLeft(): number {
    return Math.max(0, this.activity.totalSlots - this.activity.registeredSlots);
  }

  get thumbnail(): string {
    return CATEGORY_IMAGES[this.activity.category] || DEFAULT_IMAGE;
  }

  get badgeClass(): string {
    switch (this.activity.status) {
      case 'open': return 'badge-open';
      case 'full': return 'badge-full';
      default: return 'badge-closed';
    }
  }
}
