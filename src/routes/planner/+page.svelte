<script>
	import moment from 'moment';

	let today = moment().hour(0).minute(0).second(0).millisecond(0);
	let date = today.format('YY.MM.DD. (ddd.)');
	let dday = moment('2024-11-14', 'YYYY-MM-DD');
	let diff = dday.diff(today) / (24*60*60*1000);

	let tasks = [
		{
			content: '마더텅 독서 3지문',
			group: '국어',
			repeat: {
				type: 'day',
				day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			},
			time: undefined,
			done: [],
		},
	];
</script>

<svelte:head>
	<title>플래너</title>
</svelte:head>

<header>
	<!-- 날짜 선택, 내보내기 버튼 -->
	<span id="title">플래너</span>
</header>

<main>
	<!-- 캘린더 -->
	<section id="tasks">
		<section id="date">
			{ date } / D-{ diff }
		</section>
		<section id="todo">
			<table>
				<tr>
					<td class="group">국어</td>
					<td class="content">마더텅</td>
				</tr>
			</table>
		</section>
	</section>
	<section id="times">

	</section>
</main>

<footer>
	<!-- 그룹, 할 일 추가 버튼 -->
</footer>

<style>
	header, main, footer, section {
		border: 1px solid;
	}

	header {
		height: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#title {
		font-size: 40px;
		font-weight: 400;
	}

	main {
		height: 80%;
		display: flex;
		flex-direction: row;
	}
	
	#tasks {
		width: 70%;
		height: 100%;
	}

	table {

	}
	td.group {
		
	}

	#times {
		width: 30%;
		height: 100%;
	}

	footer {
		height: 10%;
	}

	#date {
		font-size: 24px;
		padding: 16px;
		margin: 1em 0;
		width: fit-content;
		border-radius: 18px;

		position: relative;
		left: 50%;
		transform: translateX(-50%);
	}

</style>
