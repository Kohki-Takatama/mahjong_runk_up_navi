const tabs = document.querySelectorAll('[role="tab"]');
const tabContents = document.querySelectorAll('.tab-content');
const applySwipeContents = document.querySelectorAll('body, .table');

function activateTab(tabIndex) {
  tabs.forEach((tab, index) => {
    if (index === tabIndex) {
      tab.classList.add('tab-active');
      tabContents[index].classList.add('active');
    } else {
      tab.classList.remove('tab-active');
      tabContents[index].classList.remove('active');
    }
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(index));
});

// Add swipe functionality
applySwipeContents.forEach((container) => {
  const mc = new Hammer(container);

  mc.on('swipeleft', () => {
    const activeTabIndex = [...tabs].findIndex((tab) => tab.classList.contains('tab-active'));
    if (activeTabIndex < tabs.length - 1) {
      activateTab(activeTabIndex + 1);
    }
  });

  mc.on('swiperight', () => {
    const activeTabIndex = [...tabs].findIndex((tab) => tab.classList.contains('tab-active'));
    if (activeTabIndex > 0) {
      activateTab(activeTabIndex - 1);
    }
  });
});

// Set body height to viewport height
const setBodyHeight = () => {
  document.body.style.height = window.innerHeight + 'px';
};

window.addEventListener('resize', setBodyHeight);
window.addEventListener('load', setBodyHeight);

document.addEventListener('DOMContentLoaded', function () {
  const welcome_image = document.querySelector('.welcome');
  const main_container = document.querySelector('.main_container');

  // 指定秒後にフェードアウト・イン開始
  setTimeout(() => {
    main_container.classList.add('fadein');
    welcome_image.classList.add('fadeout');
    welcome_image.style.display = 'none'; // fadeinと重なるが、iOSでは優先度の関係か適応されないため、ここでも記述
  }, 1200);
});

const host_points_list = [
  [1500, 500, ['30符1翻']],
  [2000, 700, ['40符1翻', '20符2翻']],
  [2400, 800, ['50符1翻', '25符2翻']],
  [2900, 1000, ['60符1翻', '30符2翻']],
  [3400, 1200, ['70符1翻']],
  [3900, 1300, ['80符1翻', '40符2翻']],
  [4400, 1500, ['90符1翻']],
  [4800, 1600, ['100符1翻', '50符2翻', '25符3翻']],
  [5300, 1800, ['110符1翻']],
  [5800, 2000, ['60符2翻', '30符3翻']],
  [6800, 2300, ['70符2翻']],
  [7700, 2600, ['80符2翻', '40符3翻', '20符4翻']],
  [8700, 2900, ['90符2翻']],
  [9600, 3200, ['100符2翻', '50符3翻', '25符4翻']],
  [10600, 3600, ['110符2翻']],
  [11600, 3900, ['60符3翻', '30符4翻']],
  [12000, 4000, ['40符4翻~', '5翻']],
  [18000, 6000, ['6翻', '7翻']],
  [24000, 8000, ['8翻', '9翻', '10翻']],
  [36000, 12000, ['11翻', '12翻']],
  [48000, 16000, ['13翻']],
];

const non_host_points_list = [
  [1000, 300, 500, ['30符1翻']],
  [1300, 400, 700, ['40符1翻', '20符2翻']],
  [1600, 400, 800, ['50符1翻', '25符2翻']],
  [2000, 500, 1000, ['60符1翻', '30符2翻']],
  [2300, 600, 1200, ['70符1翻']],
  [2600, 700, 1300, ['80符1翻', '40符2翻']],
  [2900, 800, 1500, ['90符1翻']],
  [3200, 800, 1600, ['100符1翻', '50符2翻', '25符3翻']],
  [3600, 900, 1800, ['110符1翻']],
  [3900, 1000, 2000, ['60符2翻', '30符3翻']],
  [4500, 1200, 2300, ['70符2翻']],
  [5200, 1300, 2600, ['80符2翻', '40符3翻', '20符4翻']],
  [5800, 1500, 2900, ['90符2翻']],
  [6400, 1600, 3200, ['100符2翻', '50符3翻', '25符4翻']],
  [7100, 1800, 3600, ['110符2翻']],
  [7700, 2000, 3900, ['60符3翻', '30符4翻']],
  [8000, 2000, 4000, ['40符4翻~', '5翻']],
  [12000, 3000, 6000, ['6翻', '7翻']],
  [16000, 4000, 8000, ['8翻', '9翻', '10翻']],
  [24000, 6000, 12000, ['11翻', '12翻']],
  [32000, 8000, 16000, ['13翻']],
];

let player_points = [];
let field_points = [];
let active_perspective_index = 0;
let host_index = 0;
let additional_riichi = [false, false, false, false];

const input_nums = document.querySelectorAll("input[type='number']");
const input_perspectives = document.querySelectorAll('input[name="perspective_select"]');
const input_hosts = document.querySelectorAll('input[name="host_select"]');
const input_riichi = document.querySelectorAll('input[type="checkbox"]');

const display_hosts = document.querySelectorAll('.display_host');
const display_perspectives = document.querySelectorAll('.display_perspective');
const display_points = document.querySelectorAll('.stat-value');
const display_point_diffs = document.querySelectorAll('.stat-desc');
const display_field_info = document.querySelectorAll('.field_num');
const display_tr = document.querySelectorAll('.display_p0, .display_p1, .display_p2, .display_p3');
const display_role_p0 = document.querySelectorAll('.display_p0 > td:nth-of-type(n+2):nth-of-type(-n+4)');
const display_role_p1 = document.querySelectorAll('.display_p1 > td:nth-of-type(n+2):nth-of-type(-n+4)');
const display_role_p2 = document.querySelectorAll('.display_p2 > td:nth-of-type(n+2):nth-of-type(-n+4)');
const display_role_p3 = document.querySelectorAll('.display_p3 > td:nth-of-type(n+2):nth-of-type(-n+4)');

const update_views = () => {
  // 親表示
  display_hosts.forEach((e, i) => {
    e.classList.add('hidden');
    if (i === host_index) {
      e.classList.remove('hidden');
    }
  });
  // 視点表示
  display_perspectives.forEach((e, i) => {
    e.classList.add('hidden');
    if (i === active_perspective_index) {
      e.classList.remove('hidden');
    }
  });
  // 点数表示
  display_points.forEach((e, i) => {
    const point = additional_riichi[i] ? player_points[i] - 1000 : player_points[i];
    e.textContent = point;
  });
  display_tr.forEach((e) => {
    e.classList.remove('bg-gray-50', 'bg-red-100', 'bg-blue-100', 'bg-yellow-100');
  });
  display_point_diffs.forEach((e, i) => {
    e.classList.remove('hidden');
    const point_diff = (player_points[i] - player_points[active_perspective_index] - (additional_riichi[i] ? 1000 : 0) + (additional_riichi[active_perspective_index] ? 1000 : 0)) | 0;
    e.textContent = point_diff > 0 ? '+' + point_diff : point_diff;
    if (i === active_perspective_index) {
      e.classList.add('hidden');
      display_tr[i].classList.add('bg-gray-50');
    } else if (point_diff > 0) {
      display_tr[i].classList.add('bg-red-100');
    } else if (point_diff === 0) {
      display_tr[i].classList.add('bg-yellow-100');
    } else {
      display_tr[i].classList.add('bg-blue-100');
    }
  });
  // 供託入力
  display_field_info.forEach((e, i) => {
    const n = field_points[i] | 0;
    e.textContent = i === 1 ? n + additional_riichi.filter(Boolean).length : n;
  });

  // 翻・符検索
  const search_role = (compare_index) => {
    const perspective_point = additional_riichi[active_perspective_index] ? player_points[active_perspective_index] - 1000 : player_points[active_perspective_index];
    const compare_point = additional_riichi[compare_index] ? player_points[compare_index] - 1000 : player_points[compare_index];
    let perspective_is_host = active_perspective_index === host_index;
    let compare_is_host = compare_index === host_index;

    let diff = compare_point - perspective_point;
    let tumo;
    let direct_ron;
    let indirect_ron;
    const riichi_point = (field_points[1] + additional_riichi.filter(Boolean).length) * 1000;
    if (compare_index === active_perspective_index) {
      return [['☓'], ['☓'], ['☓']];
    }
    if (diff < 0) {
      if (perspective_is_host !== compare_is_host) {
        perspective_is_host = !perspective_is_host;
        compare_is_host = !compare_is_host;
      }
      diff = Math.abs(diff);
    }
    if (perspective_is_host) {
      tumo = host_points_list.find((e) => diff <= e[1] * 4 + field_points[0] * 400 + riichi_point);
      direct_ron = host_points_list.find((e) => diff <= e[0] * 2 + field_points[0] * 600 + riichi_point);
      indirect_ron = host_points_list.find((e) => diff <= e[0] + field_points[0] * 300 + riichi_point);
    } else if (compare_is_host) {
      tumo = non_host_points_list.find((e) => diff <= e[2] * 2 + e[1] * 2 + field_points[0] * 400 + riichi_point);
      direct_ron = non_host_points_list.find((e) => diff <= e[0] * 2 + field_points[0] * 600 + riichi_point);
      indirect_ron = non_host_points_list.find((e) => diff <= e[0] + field_points[0] * 300 + riichi_point);
    } else {
      tumo = non_host_points_list.find((e) => diff <= e[2] + e[1] * 3 + field_points[0] * 400 + riichi_point);
      direct_ron = non_host_points_list.find((e) => diff <= e[0] * 2 + field_points[0] * 600 + riichi_point);
      indirect_ron = non_host_points_list.find((e) => diff <= e[0] + field_points[0] * 300 + riichi_point);
    }
    tumo = tumo ? [...tumo.at(-1), `(${tumo.length === 4 ? tumo[1] + '/' + tumo[2] : tumo[1] + ' All'})`] : ['☓'];
    direct_ron = direct_ron ? [...direct_ron.at(-1), `(${direct_ron[0]})`] : ['☓'];
    indirect_ron = indirect_ron ? [...indirect_ron.at(-1), `(${indirect_ron[0]})`] : ['☓'];
    return [tumo, direct_ron, indirect_ron];
  };
  const display_role_values = [search_role(0), search_role(1), search_role(2), search_role(3)];
  display_role_p0.forEach((e, i) => {
    e.innerText = display_role_values[0][i].join('\n');
  });
  display_role_p1.forEach((e, i) => {
    e.innerText = display_role_values[1][i].join('\n');
  });
  display_role_p2.forEach((e, i) => {
    e.innerText = display_role_values[2][i].join('\n');
  });
  display_role_p3.forEach((e, i) => {
    e.innerText = display_role_values[3][i].join('\n');
  });
};

input_nums.forEach((input) => {
  input.addEventListener('change', () => {
    // 変更の適用
    player_points = [Number(input_nums[0].value | 0), Number(input_nums[1].value | 0), Number(input_nums[2].value | 0), Number(input_nums[3].value | 0)];
    field_points = [Number(input_nums[4].value | 0), Number(input_nums[5].value | 0)];
    // 再処理
    update_views();
  });
});

input_perspectives.forEach((input) => {
  input.addEventListener('change', () => {
    // 変更の適用
    input_perspectives.forEach((e, i) => {
      if (e.checked) {
        active_perspective_index = i;
      }
    });
    // 再処理
    update_views();
  });
});

input_hosts.forEach((input) => {
  input.addEventListener('change', () => {
    // 変更の適用
    input_hosts.forEach((e, i) => {
      if (e.checked) {
        host_index = i;
      }
    });
    // 再処理
    update_views();
  });
});

input_riichi.forEach((input) => {
  input.addEventListener('change', () => {
    // 変更の適用
    additional_riichi = [false, false, false, false];
    input_riichi.forEach((e, i) => {
      if (e.checked) {
        additional_riichi[i] = true;
      }
    });
    // 再処理
    update_views();
  });
});
