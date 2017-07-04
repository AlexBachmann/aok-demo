import { Injectable } from '@angular/core';

export interface Video {
	id: number;
	url: string;
	title: string;
	description?: string;
	categories: string[];
	date: string;
	enabled?: boolean;
	steps?: {title: string, description: string}[];
}

@Injectable()
export class VideoService {
	private videos: Video[] = [
		{
			id: 1, 
			url: 'https://www.youtube.com/watch?v=stMjdP88Bxo', 
			title: 'Nacken Verspannung lösen', 
			date: '2017-07-02', 
			categories: ['Entspannung', 'Hals', 'Konzentration'], 
			enabled: true,
			steps: [
				{
					title: 'Variiere die Kreisbewegung',
					description: 'Ziel ist es, die Nackenmuskulatur zu lösen und zu bewegen. Fange daher mit kleinen Achten an und werde dann größer.'
				},
				{
					title: 'Konzentriere Dich auf die Übung',
					description: 'Vergiss kurz die Arbeit und mach Deinen Kopf frei. Indem Du Dich auf die Übung konzentrierst, bekommt dein Geist eine wohl verdiente Pause.'
				}
			]
		},
		{
			id: 2, 
			url: 'https://www.youtube.com/watch?v=sGQo_hOBB0o', 
			title: 'Brust und Rücken öffnen', 
			date: '2017-07-01', 
			categories: ['Entspannung', 'Rücken', 'Brust', 'Konzentration'], 
			enabled: true,
			steps: [
				{
					title: 'Stelle die Beine Schulterbreit',
					description: 'Für diese Übung brauchst Du Stabilität. Stelle Dich so hin, dass Deine Beine schulterbrei auseinander stehen.'
				},
				{
					title: 'Löse die Rückenmuskulatur',
					description: 'Durch langes Sitzen versteift sich Deine Rückenmuskulatur. Wenn Du Kopf und Oberkörper nach vorne einrollst, versuche Dich auf Deine Rückenmuskulatur zu konzentrieren. Atme kurz durch, um die Muskulatur zu entspannen.'
				},
				{
					title: 'Dehne Bauch und Rückenmuskulatur',
					description: 'Indem Du Deinen Oberkörper streckst und die Arme nach oben nimmst, wird Deine Bauch- und Rückenmuskulatur gedehnt, Verspannungen werden gelöst.'
				},
				{
					title: 'Verstärke den Effekt mit Deiner Hüfte',
					description: 'Indem Du die Hüfte nach vorne nimmst, verstärkst Du den Effekt der Dehnung.'
				},
			]
		},
		{id: 3, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Side to Side', date: '2017-06-30', categories: ['Workout', 'Beine', 'Taille', 'Hüfte'], enabled: false},
		{id: 4, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Step Touch', date: '2017-06-29', categories: ['Workout', 'Beine'], enabled: false},
		{id: 5, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Mambo Cha Cha', date: '2017-06-28', categories: ['Workout', 'Becken'], enabled: false},
		{id: 6, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Side Knee Lift', date: '2017-06-27', categories: ['Workout', 'Bauch', 'Beine', 'Po'], enabled: false},
		{id: 7, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Knee Lift', date: '2017-06-26', categories: ['Workout', 'Beine', 'Ballance', 'Konzentration'], enabled: false},
		{id: 8, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Knee Slide', date: '2017-06-25', categories: ['Workout', 'Beine', 'Ballance', 'Konzentration'], enabled: false},
		{id: 9, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Rock Your Body', date: '2017-06-24', categories: ['Workout', 'Oberkörper'], enabled: false},
		{id: 10, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Power Sonnengruß', date: '2017-06-23', categories: ['Yoga'], enabled: false},
		{id: 11, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Dynamic Side Bridge', date: '2017-06-22', categories: ['Workout', 'Taille'], enabled: false},
		{id: 12, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Shoulder Bridge', date: '2017-06-21', categories: ['Workout', 'Rücken', 'Po', 'Schultern'], enabled: false},
		{id: 13, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Fit & Fun Twist', date: '2017-06-20', categories: ['Workout', 'Bauch', 'Beine', 'Po'], enabled: false},
		{id: 14, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Pranayama und Kriya', date: '2017-06-19', categories: ['Yoga'], enabled: false},
		{id: 15, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Yayu Mandalas', date: '2017-06-18', categories: ['Yoga'], enabled: false},
		{id: 16, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Namaskar', date: '2017-06-17', categories: ['Yoga'], enabled: false},
		{id: 17, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Regenbogenkrieger 1', date: '2017-06-16', categories: ['Yoga', 'Atmung'], enabled: false},
		{id: 18, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Regenbogenkrieger 2', date: '2017-06-15', categories: ['Yoga', 'Atmung'], enabled: false},
		{id: 19, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Drehendes Helden-Dreieck', date: '2017-06-14', categories: ['Yoga', 'Dehnung'], enabled: false},
		{id: 20, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Spiralsequenz', date: '2017-06-13', categories: ['Yoga', 'Dehnung'], enabled: false},
		{id: 21, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Flying High', date: '2017-06-12', categories: ['Yoga'], enabled: false},
		{id: 22, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Bogenschütze', date: '2017-06-11', categories: ['Rücken'], enabled: false},
		{id: 23, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Göttinnen-Sequenz ', date: '2017-06-10', categories: ['Yoga', 'Rücken'], enabled: false},
		{id: 24, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Shavasana', date: '2017-06-09', categories: ['Yoga', 'Atmung'], enabled: false},
		{id: 25, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Creative Flow Dance', date: '2017-06-08', categories: ['Yoga'], enabled: false},
		{id: 26, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Workout - Taille', date: '2017-06-07', categories: ['Workout', 'Taille'], enabled: false},
		{id: 27, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Workout - Rücken', date: '2017-06-06', categories: ['Workout', 'Rücken'], enabled: false},
		{id: 28, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Workout - Beine', date: '2017-06-05', categories: ['Workout', 'Beine'], enabled: false},
		{id: 29, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Workout - Arme', date: '2017-06-04', categories: ['Workout', 'Arme'], enabled: false},
		{id: 30, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Workout - Bauch', date: '2017-06-03', categories: ['Workout', 'Bauch'], enabled: false},
		{id: 31, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Ganzkörpertraining', date: '2017-06-02', categories: ['Workout', 'Ganzkörper'], enabled: false},
		{id: 32, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: '7 Minute Workout', date: '2017-06-01', categories: ['Workout', 'Ganzkörper'], enabled: false},
		{id: 33, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Sumo-Kniebeuge', date: '2017-05-31', categories: ['Workout', 'Beine'], enabled: false},
		{id: 34, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Liegestütz', date: '2017-05-30', categories: ['Workout', 'Arme'], enabled: false},
		{id: 35, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Käfer', date: '2017-05-29', categories: ['Workout', 'Rücken', 'Schulter'], enabled: false},
		{id: 36, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Planke', date: '2017-05-28', categories: ['Workout', 'Bauch', 'Rücken'], enabled: false},
		{id: 37, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'High Knees', date: '2017-05-27', categories: ['Workout', 'Beine', 'Ausdauer'], enabled: false},
		{id: 38, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Ausfallschritt mit Drehung', date: '2017-05-26', categories: ['Workout', 'Beine'], enabled: false},
		{id: 39, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Eingedrehter Seitstütz', date: '2017-05-25', categories: ['Workout', 'Beine'], enabled: false},
		{id: 40, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Skater-Sprünge', date: '2017-05-24', categories: ['Workout', 'Beine', 'Ausdauer'], enabled: false},
		{id: 41, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Umgekehrtes Schulterdrücken', date: '2017-05-23', categories: ['Workout', 'Schulter', 'Arme'], enabled: false},
		{id: 42, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Lat-Rudern', date: '2017-05-22', categories: ['Workout', 'Rücken', 'Arme'], enabled: false},
		{id: 43, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Burpee', date: '2017-05-21', categories: ['Workout', 'Beine', 'Rücken'], enabled: false},
		{id: 44, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Schwimmer', date: '2017-05-20', categories: ['Workout', 'Rücken'], enabled: false},
		{id: 45, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Cardio-Balance', date: '2017-05-19', categories: ['Workout', 'Beine', 'Oberkörper', 'Ballance'], enabled: false},
		{id: 46, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Around the world', date: '2017-05-18', categories: ['Workout', 'Ballance', 'Rücken', 'Beine'], enabled: false},
		{id: 47, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Seitstütz eingedreht', date: '2017-05-17', categories: ['Beine', 'Ballance', 'Konzentration'], enabled: false},
		{id: 48, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Der Stuhl', date: '2017-05-16', categories: ['Yoga', 'Beine'], enabled: false},
		{id: 49, url: 'https://www.youtube.com/watch?v=XTqGp-vO960', title: 'Vorwärtsbeuge', date: '2017-05-15', categories: ['Yoga', 'Rücken', 'Dehnung', 'Beine'], enabled: false},
		{id: 50, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Katze / Kuh', date: '2017-05-14', categories: ['Yoga', 'Rücken'], enabled: false},
		{id: 51, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Herabschauender Hund', date: '2017-05-13', categories: ['Yoga', 'Bauch', 'Rücken'], enabled: false},
		{id: 52, url: 'https://www.youtube.com/watch?v=RhBR4EO51gU', title: 'Heuschrecke', date: '2017-05-12', categories: ['Yoga', 'Rücken'], enabled: false}
	]
	get(id: number): Video {
		return this.videos.filter((video) => {
			return video.id == id;
		})[0];
	}
	getEnabled():Video[]{
		return this.videos.filter((video) => video.enabled == true);
	}
	getRecommendations(amount: number):Video[]{
		return this.getRandomVideos(amount)
	}
	getRandomVideos(amount: number):Video[]{
		var videos: Video[] = [];
		while(true){
			var video = this.videos[Math.floor(Math.random() * this.videos.length)];
			if(videos.filter((current_video) => current_video.id == video.id).length) continue;
			videos.push(video);
			if(videos.length >= amount) break;
		}
		return videos;
	}
	getVideos():Video[]{
		return this.videos;
	}
	sortBy(videos: Video[], property: string, dir: string):Video[]{
		return videos.sort((video1, video2) => video1[property] - video2[property]);
	}
	getByCategories(categories:string[]): Video[]{
		if(!categories.length) return this.videos;
		return this.videos.filter((video) => {
			var ret = false;
			for(var category of categories){
				if(video.categories.indexOf(category) >= 0) ret = true;
			}
			return ret;
		});
	}
	getCategories(): string[]{
		var categories = []
		for(var video of this.videos){
			for(var category of video.categories){
				if(categories.indexOf(category) < 0){
					categories.push(category);
				}
			}
		}
		return categories;
	}
}