/**
 * Podevus 全局音乐播放器
 * 大正浪漫风格设计
 * 支持跨页面持续播放（通过localStorage）
 * 支持专辑分组折叠
 */

(function() {
    'use strict';

    // ============ 配置区域 ============
    const MUSIC_CONFIG = {
        basePath: /\/(posts|category)\//.test(location.pathname) ? '../muse/' : './muse/',
        // 按专辑分组的播放列表
        albums: [
            {
                name: '惑い空',
                artist: 'VISUAL ARTS/Key',
                expanded: false,
                songs: [
                    { title: '惑い空', artist: '鴉羽(CV_楠木ともり)', file: 'VISUAL ARTS _ Key _ 鴉羽(CV_楠木ともり) - 惑い空.ogg' },
                ]
            },
            {
                name: '終わりの惑星のLove Song',
                artist: '麻枝准 x やなぎなぎ',
                expanded: false,
                songs: [
                    { title: '終わりの世界から', artist: '麻枝准 x やなぎなぎ', file: '01 終わりの世界から.mp3' },
                    { title: 'ふたりだけのArk', artist: '麻枝准 x やなぎなぎ', file: '02 ふたりだけのArk.mp3' },
                    { title: 'Killer Song', artist: '麻枝准 x やなぎなぎ', file: '03 Killer Song.mp3' },
                    { title: 'Flower Garden', artist: '麻枝准 x やなぎなぎ', file: '04 Flower Garden.mp3' },
                    { title: '無敵のSoldier', artist: '麻枝准 x やなぎなぎ', file: '05 無敵のSoldier.mp3' },
                    { title: '凍る夢', artist: '麻枝准 x やなぎなぎ', file: '06 凍る夢.mp3' },
                    { title: 'Executionerの恋', artist: '麻枝准 x やなぎなぎ', file: '07 Executionerの恋.mp3' },
                    { title: 'とある海賊王の気まぐれ', artist: '麻枝准 x やなぎなぎ', file: '08 とある海賊王の気まぐれ.mp3' },
                    { title: '雪の降らない星', artist: '麻枝准 x やなぎなぎ', file: '09 雪の降らない星.mp3' },
                    { title: '火吹き山の魔法使い', artist: '麻枝准 x やなぎなぎ', file: '10 火吹き山の魔法使い.mp3' },
                    { title: 'Last Smile', artist: '麻枝准 x やなぎなぎ', file: '11 Last Smile.mp3' },
                    { title: 'Heroの条件', artist: '麻枝准 x やなぎなぎ', file: '12 Heroの条件.mp3' },
                    { title: 'この惑星のBirthday Song', artist: '麻枝准 x やなぎなぎ', file: '13 この惑星のBirthday Song.mp3' },
                ]
            },
            {
                name: 'Love Song from the Water',
                artist: '麻枝准 x やなぎなぎ',
                expanded: false,
                songs: [
                    { title: 'Before I Rise', artist: '麻枝准 x やなぎなぎ', file: '01 Before I Rise.mp3' },
                    { title: 'Burn My Universe', artist: '麻枝准 x やなぎなぎ', file: '02 Burn My Universe.mp3' },
                    { title: 'Everlasting Night', artist: '麻枝准 x やなぎなぎ', file: '03 Everlasting Night.mp3' },
                    { title: '星の墓標', artist: '麻枝准 x やなぎなぎ', file: '04 星の墓標.mp3' },
                    { title: 'Indigo in Blue', artist: '麻枝准 x やなぎなぎ', file: '05 Indigo in Blue.mp3' },
                    { title: 'Sad Creature', artist: '麻枝准 x やなぎなぎ', file: '06 Sad Creature.mp3' },
                    { title: '夏気球', artist: '麻枝准 x やなぎなぎ', file: '07 夏気球.mp3' },
                    { title: 'Particle Effect', artist: '麻枝准 x やなぎなぎ', file: '08 Particle Effect.mp3' },
                    { title: '銀河旅団', artist: '麻枝准 x やなぎなぎ', file: '09 銀河旅団.mp3' },
                    { title: 'インドラ', artist: '麻枝准 x やなぎなぎ', file: '10 インドラ.mp3' },
                    { title: 'Light Years', artist: '麻枝准 x やなぎなぎ', file: '11 Light Years.mp3' },
                    { title: 'きみの横顔', artist: '麻枝准 x やなぎなぎ', file: '12 きみの横顔.mp3' },
                    { title: 'White Spell', artist: '麻枝准 x やなぎなぎ', file: '13 White Spell.mp3' },
                ]
            },
            {
                name: '若大将合集',
                artist: '加山雄三',
                expanded: false,
                songs: [
                    { title: '知床旅情', artist: '加山雄三', file: '加山雄三 - 知床旅情.ogg' },
                    { title: '海　その愛', artist: '加山雄三', file: '加山雄三 - 海　その愛.ogg' },
                ]
            },
            {
                name: 'MANYO合集',
                artist: 'MANYO',
                expanded: false,
                songs: [
                    { title: 'Thin purple', artist: 'MANYO', file: 'MANYO - Thin purple.ogg' },
                    { title: 'メインテーマ', artist: 'MANYO', file: 'MANYO - メインテーマ.ogg' },
                    { title: '久遠', artist: 'MANYO', file: 'MANYO - 久遠….ogg' },
                    { title: '黄昏', artist: 'MANYO, 麻枝准', file: 'MANYO _ 麻枝准 - 黄昏.ogg' },
                    { title: 'Lilac', artist: 'MANYO', file: 'MANYO - Lilac.ogg' },
                    { title: 'キミと過ごす時間', artist: 'MANYO', file: 'MANYO - キミと過ごす時間 (跟你共度的时间).ogg' },
                    { title: '混ざり合う心', artist: 'MANYO', file: 'MANYO - 混ざり合う心.ogg' },
                    { title: '祈り', artist: 'MANYO', file: 'MANYO - 祈り (祈祷).ogg' },
                ]
            },
            {
                name: 'Key合集',
                artist: 'VISUAL ARTS/Key',
                expanded: false,
                songs: [
                    { title: 'ニリンソウ', artist: 'VISUAL ARTS, Key Sounds Label', file: 'VISUAL ARTS _ Key Sounds Label - ニリンソウ (鹅掌草).ogg' },
                    { title: 'Theme of SSSロック风アレンジ', artist: '麻枝准', file: '麻枝准 - ロック风アレンジ.ogg' },
                    { title: '散花', artist: 'VISUAL ARTS, Key Sounds Label (キー・サウンズ・レーベル)', file: 'VISUAL ARTS_Key Sounds Label (キー・サウンズ・レーベル) - 散花.ogg' },
                    { title: 'Vitae', artist: 'VISUAL ARTS/Key', file: 'Various Artists _ VISUAL ARTS _ Key - Vitae.ogg' },
                    { title: 'Reminiscence', artist: 'VISUAL ARTS/Key', file: 'Various Artists _ VISUAL ARTS _ Key - Reminiscence.ogg' },
                ]
            },
            {
                name: '杂合集',
                artist: '-',
                expanded: false,
                songs: [
                    { title: '星が瞬くこんな夜に', artist: 'supercell', file: 'supercell - 星が瞬くこんな夜に (ゲームVer_).ogg' },
                ]
            },
        ]
    };

    // ============ 样式注入 ============
    const styles = `
/* ============ 音乐播放器样式 ============ */
.podevus-player {
    --player-bg: #faf8f3;
    --player-card: #ffffff;
    --player-accent: #c89b6d;
    --player-accent-hover: #a67c52;
    --player-text: #2d2520;
    --player-text-secondary: #5a504a;
    --player-text-muted: #8b7f76;
    --player-border: #e8dfd2;
    --player-shadow: rgba(45, 37, 32, 0.15);
}

@media (prefers-color-scheme: dark) {
    .podevus-player {
        --player-bg: #1a1816;
        --player-card: #242220;
        --player-accent: #d4a574;
        --player-accent-hover: #e6b786;
        --player-text: #e8e6e3;
        --player-text-secondary: #c4bfb8;
        --player-text-muted: #8b8580;
        --player-border: #3a3633;
        --player-shadow: rgba(0, 0, 0, 0.4);
    }
}

.podevus-player {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-family: "Noto Serif JP", "Source Han Serif CN", Georgia, serif;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.podevus-player.hidden {
    transform: translateX(calc(100% + 40px));
    opacity: 0;
    pointer-events: none;
}

/* 播放器主体 */
.player-container {
    background: var(--player-card);
    border: 1px solid var(--player-border);
    border-radius: 12px;
    box-shadow: 0 8px 32px var(--player-shadow);
    overflow: hidden;
    width: 320px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
}

.player-container.collapsed {
    width: 280px;
}

/* 装饰顶边 */
.player-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--player-accent), var(--player-accent-hover));
    z-index: 1;
}

/* 控制区域 */
.player-controls {
    padding: 18px 20px;
    background: var(--player-bg);
    border-bottom: 1px solid var(--player-border);
}

.player-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
}

.player-title-area {
    flex: 1;
    min-width: 0;
    margin-right: 10px;
}

.current-song {
    font-size: 0.95em;
    font-weight: 500;
    color: var(--player-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
}

.current-artist {
    font-size: 0.8em;
    color: var(--player-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.player-buttons {
    display: flex;
    align-items: center;
    gap: 6px;
}

.player-btn {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background: var(--player-accent);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;
    flex-shrink: 0;
}

.player-btn:hover {
    background: var(--player-accent-hover);
    transform: scale(1.08);
}

.player-btn.play-pause {
    width: 38px;
    height: 38px;
}

.player-btn svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
}

.player-btn.play-pause svg {
    width: 16px;
    height: 16px;
}

.player-btn.toggle-list {
    background: transparent;
    color: var(--player-text-muted);
    border: 1px solid var(--player-border);
}

.player-btn.toggle-list:hover {
    color: var(--player-accent);
    border-color: var(--player-accent);
    background: transparent;
}

.player-btn.toggle-list.active {
    color: var(--player-accent);
    border-color: var(--player-accent);
}

.player-btn.close-btn {
    background: transparent;
    color: var(--player-text-muted);
}

.player-btn.close-btn:hover {
    color: #d32f2f;
    background: rgba(211, 47, 47, 0.1);
}

/* 进度条区域 */
.progress-area {
    display: flex;
    align-items: center;
    gap: 10px;
}

.progress-time {
    font-size: 0.75em;
    color: var(--player-text-muted);
    min-width: 36px;
    text-align: center;
    font-variant-numeric: tabular-nums;
}

.progress-bar-container {
    flex: 1;
    height: 6px;
    background: var(--player-border);
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--player-accent), var(--player-accent-hover));
    border-radius: 3px;
    width: 0%;
    transition: width 0.1s linear;
    position: relative;
}

.progress-bar::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    background: var(--player-accent-hover);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s;
}

.progress-bar-container:hover .progress-bar::after {
    opacity: 1;
}

/* 歌曲列表区域 */
.playlist-area {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.playlist-area.expanded {
    max-height: 350px;
}

.playlist-scroll {
    max-height: 350px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--player-accent) var(--player-border);
}

.playlist-scroll::-webkit-scrollbar {
    width: 6px;
}

.playlist-scroll::-webkit-scrollbar-track {
    background: var(--player-border);
}

.playlist-scroll::-webkit-scrollbar-thumb {
    background: var(--player-accent);
    border-radius: 3px;
}

/* 专辑分组样式 */
.album-group {
    border-bottom: 1px solid var(--player-border);
}

.album-group:last-child {
    border-bottom: none;
}

.album-header {
    padding: 12px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--player-bg);
    transition: all 0.2s ease;
    user-select: none;
}

.album-header:hover {
    background: var(--player-border);
}

.album-header.has-playing {
    background: linear-gradient(90deg, rgba(200, 155, 109, 0.15), var(--player-bg));
}

.album-toggle {
    width: 16px;
    height: 16px;
    fill: var(--player-text-muted);
    transition: transform 0.3s ease;
    flex-shrink: 0;
}

.album-header.expanded .album-toggle {
    transform: rotate(90deg);
}

.album-info {
    flex: 1;
    min-width: 0;
}

.album-name {
    font-size: 0.9em;
    font-weight: 600;
    color: var(--player-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.album-header.has-playing .album-name {
    color: var(--player-accent);
}

.album-artist {
    font-size: 0.75em;
    color: var(--player-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.album-count {
    font-size: 0.7em;
    color: var(--player-text-muted);
    background: var(--player-border);
    padding: 2px 8px;
    border-radius: 10px;
    flex-shrink: 0;
}

/* 专辑内歌曲列表 */
.album-songs {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    background: var(--player-card);
}

.album-group.expanded .album-songs {
    max-height: 1000px;
}

.playlist-item {
    padding: 10px 16px 10px 42px;
    cursor: pointer;
    border-bottom: 1px solid var(--player-border);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 10px;
}

.playlist-item:last-child {
    border-bottom: none;
}

.playlist-item:hover {
    background: var(--player-bg);
}

.playlist-item.active {
    background: linear-gradient(90deg, rgba(200, 155, 109, 0.1), transparent);
    border-left: 3px solid var(--player-accent);
    padding-left: 39px;
}

.playlist-item-index {
    font-size: 0.75em;
    color: var(--player-text-muted);
    min-width: 18px;
}

.playlist-item.active .playlist-item-index {
    color: var(--player-accent);
}

.playlist-item-info {
    flex: 1;
    min-width: 0;
}

.playlist-item-title {
    font-size: 0.85em;
    color: var(--player-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.playlist-item.active .playlist-item-title {
    color: var(--player-accent);
    font-weight: 500;
}

.playlist-item-playing {
    width: 16px;
    height: 16px;
    display: none;
}

.playlist-item.active.playing .playlist-item-playing {
    display: block;
}

/* 播放动画 */
.playing-indicator {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 14px;
}

.playing-indicator span {
    width: 3px;
    background: var(--player-accent);
    border-radius: 1px;
    animation: soundbar 0.6s ease-in-out infinite;
}

.playing-indicator span:nth-child(1) { animation-delay: 0s; }
.playing-indicator span:nth-child(2) { animation-delay: 0.15s; }
.playing-indicator span:nth-child(3) { animation-delay: 0.3s; }

@keyframes soundbar {
    0%, 100% { height: 4px; }
    50% { height: 14px; }
}

/* 打开按钮 */
.player-open-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(135deg, #c89b6d, #a67c52);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(45, 37, 32, 0.2);
    z-index: 9998;
    transition: all 0.3s ease;
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none;
}

@media (prefers-color-scheme: dark) {
    .player-open-btn {
        background: linear-gradient(135deg, #d4a574, #e6b786);
    }
}

.player-open-btn.visible {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
}

.player-open-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 24px rgba(45, 37, 32, 0.3);
}

.player-open-btn svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
}

/* 关于页面的启动入口 */
.music-player-entry {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    background: linear-gradient(135deg, #F5F0EB, #E8D2C3);
    color: #3A2E2A;
    border: 1.5px solid #C88A59;
    border-radius: 30px;
    font-family: "Noto Serif JP", "Source Han Serif CN", Georgia, serif;
    font-size: 1em;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(200, 138, 89, 0.3);
}

@media (prefers-color-scheme: dark) {
    .music-player-entry {
        background: linear-gradient(135deg, #3a3633, #2a2826);
        border-color: #d4a574;
        color: #E8D2C3;
    }
}

.music-player-entry:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #E8D2C3, #D4A8B1);
    border-color: #D4A8B1;
    box-shadow: 0 6px 24px rgba(212, 168, 177, 0.4);
}

.music-player-entry svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
}

/* 响应式 */
@media (max-width: 480px) {
    .podevus-player {
        bottom: 10px;
        right: 10px;
        left: 10px;
    }
    
    .player-container {
        width: 100%;
    }
    
    .player-container.collapsed {
        width: 100%;
    }
    
    .player-open-btn {
        bottom: 10px;
        right: 10px;
    }
}
`;

    // ============ HTML模板 ============
    const playerHTML = `
<div class="podevus-player hidden" id="podevusPlayer">
    <div class="player-container">
        <div class="player-controls">
            <div class="player-header">
                <div class="player-title-area">
                    <div class="current-song" id="currentSong">未选择歌曲</div>
                    <div class="current-artist" id="currentArtist">--</div>
                </div>
                <div class="player-buttons">
                    <button class="player-btn prev-btn" title="上一曲" id="prevBtn">
                        <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                    </button>
                    <button class="player-btn play-pause" title="播放/暂停" id="playPauseBtn">
                        <svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        <svg class="pause-icon" viewBox="0 0 24 24" style="display:none"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    </button>
                    <button class="player-btn next-btn" title="下一曲" id="nextBtn">
                        <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                    </button>
                    <button class="player-btn toggle-list" title="展开/收起歌单" id="toggleListBtn">
                        <svg viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
                    </button>
                    <button class="player-btn close-btn" title="关闭播放器" id="closePlayerBtn">
                        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    </button>
                </div>
            </div>
            <div class="progress-area">
                <span class="progress-time" id="currentTime">0:00</span>
                <div class="progress-bar-container" id="progressContainer">
                    <div class="progress-bar" id="progressBar"></div>
                </div>
                <span class="progress-time" id="totalTime">0:00</span>
            </div>
        </div>
        <div class="playlist-area" id="playlistArea">
            <div class="playlist-scroll" id="playlistScroll">
                <!-- 专辑列表将动态生成 -->
            </div>
        </div>
    </div>
</div>
<button class="player-open-btn" id="playerOpenBtn" title="打开音乐播放器">
    <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
</button>
`;

    // ============ 播放器类 ============
    class PodevusPlayer {
        constructor() {
            this.audio = new Audio();
            this.albums = MUSIC_CONFIG.albums;
            this.basePath = MUSIC_CONFIG.basePath;
            // 扁平化播放列表，用于上一曲/下一曲
            this.flatPlaylist = [];
            this.buildFlatPlaylist();
            
            this.currentAlbumIndex = 0;
            this.currentSongIndex = 0;
            this.currentFlatIndex = 0;
            this.isPlaying = false;
            this.isExpanded = false;
            this.isVisible = false;
            
            this.init();
        }

        buildFlatPlaylist() {
            this.flatPlaylist = [];
            this.albums.forEach((album, albumIdx) => {
                album.songs.forEach((song, songIdx) => {
                    this.flatPlaylist.push({
                        ...song,
                        albumIndex: albumIdx,
                        songIndex: songIdx,
                        albumName: album.name
                    });
                });
            });
        }

        init() {
            this.injectStyles();
            this.injectHTML();
            this.cacheElements();
            this.bindEvents();
            this.renderPlaylist();
            this.restoreState();
        }

        injectStyles() {
            const styleEl = document.createElement('style');
            styleEl.textContent = styles;
            document.head.appendChild(styleEl);
        }

        injectHTML() {
            document.body.insertAdjacentHTML('beforeend', playerHTML);
        }

        cacheElements() {
            this.player = document.getElementById('podevusPlayer');
            this.container = this.player.querySelector('.player-container');
            this.currentSongEl = document.getElementById('currentSong');
            this.currentArtistEl = document.getElementById('currentArtist');
            this.playPauseBtn = document.getElementById('playPauseBtn');
            this.playIcon = this.playPauseBtn.querySelector('.play-icon');
            this.pauseIcon = this.playPauseBtn.querySelector('.pause-icon');
            this.prevBtn = document.getElementById('prevBtn');
            this.nextBtn = document.getElementById('nextBtn');
            this.toggleListBtn = document.getElementById('toggleListBtn');
            this.closeBtn = document.getElementById('closePlayerBtn');
            this.progressContainer = document.getElementById('progressContainer');
            this.progressBar = document.getElementById('progressBar');
            this.currentTimeEl = document.getElementById('currentTime');
            this.totalTimeEl = document.getElementById('totalTime');
            this.playlistArea = document.getElementById('playlistArea');
            this.playlistScroll = document.getElementById('playlistScroll');
            this.openBtn = document.getElementById('playerOpenBtn');
        }

        bindEvents() {
            this.playPauseBtn.addEventListener('click', () => this.togglePlay());
            this.prevBtn.addEventListener('click', () => this.playPrev());
            this.nextBtn.addEventListener('click', () => this.playNext());
            this.toggleListBtn.addEventListener('click', () => this.toggleList());
            this.closeBtn.addEventListener('click', () => this.hide());
            this.openBtn.addEventListener('click', () => this.show());
            this.progressContainer.addEventListener('click', (e) => this.seekTo(e));
            
            let isDragging = false;
            this.progressContainer.addEventListener('mousedown', () => isDragging = true);
            document.addEventListener('mousemove', (e) => {
                if (isDragging) this.seekTo(e);
            });
            document.addEventListener('mouseup', () => isDragging = false);
            
            this.audio.addEventListener('timeupdate', () => this.updateProgress());
            this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
            this.audio.addEventListener('ended', () => this.playNext());
            this.audio.addEventListener('play', () => this.onPlay());
            this.audio.addEventListener('pause', () => this.onPause());
            
            window.addEventListener('beforeunload', () => this.saveState());
            
            setInterval(() => {
                if (this.isPlaying) this.saveState();
            }, 1000);
        }

        renderPlaylist() {
            const arrowSvg = `<svg class="album-toggle" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`;
            
            this.playlistScroll.innerHTML = this.albums.map((album, albumIdx) => `
                <div class="album-group" data-album="${albumIdx}">
                    <div class="album-header">
                        ${arrowSvg}
                        <div class="album-info">
                            <div class="album-name">${album.name}</div>
                            <div class="album-artist">${album.artist}</div>
                        </div>
                        <span class="album-count">${album.songs.length}曲</span>
                    </div>
                    <div class="album-songs">
                        ${album.songs.map((song, songIdx) => `
                            <div class="playlist-item" data-album="${albumIdx}" data-song="${songIdx}">
                                <span class="playlist-item-index">${String(songIdx + 1).padStart(2, '0')}</span>
                                <div class="playlist-item-info">
                                    <div class="playlist-item-title">${song.title}</div>
                                </div>
                                <div class="playlist-item-playing">
                                    <div class="playing-indicator">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');

            // 绑定专辑头点击事件
            this.playlistScroll.querySelectorAll('.album-header').forEach(header => {
                header.addEventListener('click', (e) => {
                    const group = header.closest('.album-group');
                    const albumIdx = parseInt(group.dataset.album);
                    this.toggleAlbum(albumIdx);
                });
            });

            // 绑定歌曲点击事件
            this.playlistScroll.querySelectorAll('.playlist-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const albumIdx = parseInt(item.dataset.album);
                    const songIdx = parseInt(item.dataset.song);
                    this.playSongByIndex(albumIdx, songIdx);
                });
            });
        }

        toggleAlbum(albumIdx) {
            const group = this.playlistScroll.querySelector(`.album-group[data-album="${albumIdx}"]`);
            const header = group.querySelector('.album-header');
            const isExpanded = group.classList.contains('expanded');
            
            group.classList.toggle('expanded', !isExpanded);
            header.classList.toggle('expanded', !isExpanded);
        }

        playSongByIndex(albumIdx, songIdx) {
            this.currentAlbumIndex = albumIdx;
            this.currentSongIndex = songIdx;
            
            // 更新扁平索引
            this.currentFlatIndex = this.flatPlaylist.findIndex(
                s => s.albumIndex === albumIdx && s.songIndex === songIdx
            );
            
            const song = this.albums[albumIdx].songs[songIdx];
            
            this.audio.src = this.basePath + song.file;
            this.currentSongEl.textContent = song.title;
            this.currentArtistEl.textContent = song.artist;
            
            this.updateActiveState();
            this.audio.play().catch(e => console.log('播放被阻止:', e));
            this.saveState();
        }

        updateActiveState() {
            // 更新歌曲高亮
            this.playlistScroll.querySelectorAll('.playlist-item').forEach(item => {
                const albumIdx = parseInt(item.dataset.album);
                const songIdx = parseInt(item.dataset.song);
                const isActive = albumIdx === this.currentAlbumIndex && songIdx === this.currentSongIndex;
                item.classList.toggle('active', isActive);
                item.classList.toggle('playing', isActive && this.isPlaying);
            });
            
            // 更新专辑头高亮
            this.playlistScroll.querySelectorAll('.album-header').forEach((header, idx) => {
                header.classList.toggle('has-playing', idx === this.currentAlbumIndex);
            });
            
            // 自动展开当前播放的专辑
            const currentGroup = this.playlistScroll.querySelector(`.album-group[data-album="${this.currentAlbumIndex}"]`);
            if (currentGroup && !currentGroup.classList.contains('expanded')) {
                currentGroup.classList.add('expanded');
                currentGroup.querySelector('.album-header').classList.add('expanded');
            }
        }

        togglePlay() {
            if (this.audio.src) {
                if (this.isPlaying) {
                    this.audio.pause();
                } else {
                    this.audio.play().catch(e => console.log('播放被阻止:', e));
                }
            } else if (this.flatPlaylist.length > 0) {
                this.playSongByIndex(0, 0);
            }
        }

        onPlay() {
            this.isPlaying = true;
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
            this.updateActiveState();
        }

        onPause() {
            this.isPlaying = false;
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
            this.updateActiveState();
        }

        playPrev() {
            const newFlatIdx = (this.currentFlatIndex - 1 + this.flatPlaylist.length) % this.flatPlaylist.length;
            const song = this.flatPlaylist[newFlatIdx];
            this.playSongByIndex(song.albumIndex, song.songIndex);
        }

        playNext() {
            const newFlatIdx = (this.currentFlatIndex + 1) % this.flatPlaylist.length;
            const song = this.flatPlaylist[newFlatIdx];
            this.playSongByIndex(song.albumIndex, song.songIndex);
        }

        toggleList() {
            this.isExpanded = !this.isExpanded;
            this.playlistArea.classList.toggle('expanded', this.isExpanded);
            this.container.classList.toggle('collapsed', !this.isExpanded);
            this.toggleListBtn.classList.toggle('active', this.isExpanded);
            this.saveState();
        }

        seekTo(e) {
            const rect = this.progressContainer.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            if (this.audio.duration) {
                this.audio.currentTime = percent * this.audio.duration;
            }
        }

        updateProgress() {
            if (this.audio.duration) {
                const percent = (this.audio.currentTime / this.audio.duration) * 100;
                this.progressBar.style.width = percent + '%';
                this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
            }
        }

        updateDuration() {
            this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
        }

        formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        show() {
            this.isVisible = true;
            this.player.classList.remove('hidden');
            this.openBtn.classList.remove('visible');
            this.saveState();
        }

        hide() {
            this.isVisible = false;
            this.player.classList.add('hidden');
            this.openBtn.classList.add('visible');
            this.saveState();
        }

        saveState() {
            const state = {
                currentAlbumIndex: this.currentAlbumIndex,
                currentSongIndex: this.currentSongIndex,
                currentTime: this.audio.currentTime || 0,
                isPlaying: this.isPlaying,
                isExpanded: this.isExpanded,
                isVisible: this.isVisible,
                timestamp: Date.now()
            };
            localStorage.setItem('podevusPlayerState', JSON.stringify(state));
        }

        restoreState() {
            try {
                const stateStr = localStorage.getItem('podevusPlayerState');
                if (!stateStr) return;
                
                const state = JSON.parse(stateStr);
                const isRecent = (Date.now() - state.timestamp) < 3600000;
                
                if (state.isVisible) {
                    this.show();
                } else {
                    this.openBtn.classList.add('visible');
                }
                
                if (state.isExpanded) {
                    this.isExpanded = true;
                    this.playlistArea.classList.add('expanded');
                    this.toggleListBtn.classList.add('active');
                } else {
                    this.container.classList.add('collapsed');
                }
                
                if (state.currentAlbumIndex !== undefined && 
                    state.currentSongIndex !== undefined &&
                    this.albums[state.currentAlbumIndex]?.songs[state.currentSongIndex]) {
                    
                    this.currentAlbumIndex = state.currentAlbumIndex;
                    this.currentSongIndex = state.currentSongIndex;
                    this.currentFlatIndex = this.flatPlaylist.findIndex(
                        s => s.albumIndex === this.currentAlbumIndex && s.songIndex === this.currentSongIndex
                    );
                    
                    const song = this.albums[this.currentAlbumIndex].songs[this.currentSongIndex];
                    
                    this.audio.src = this.basePath + song.file;
                    this.currentSongEl.textContent = song.title;
                    this.currentArtistEl.textContent = song.artist;
                    
                    this.updateActiveState();
                    
                    if (isRecent && state.currentTime > 0) {
                        this.audio.currentTime = state.currentTime;
                    }
                    
                    if (state.isPlaying && isRecent) {
                        this.audio.addEventListener('canplay', () => {
                            if (isRecent && state.currentTime > 0) {
                                this.audio.currentTime = state.currentTime;
                            }
                            this.audio.play().catch(e => {
                                console.log('自动播放被阻止，需要用户交互');
                            });
                        }, { once: true });
                    }
                }
            } catch (e) {
                console.log('恢复播放器状态失败:', e);
            }
        }

        open() {
            this.show();
        }
    }

    // ============ 初始化 ============
    let playerInstance = null;

    function initPlayer() {
        if (!playerInstance) {
            playerInstance = new PodevusPlayer();
            window.podevusPlayer = playerInstance;
        }
        return playerInstance;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPlayer);
    } else {
        initPlayer();
    }

    window.PodevusPlayer = PodevusPlayer;
    window.openMusicPlayer = function() {
        if (playerInstance) {
            playerInstance.open();
        }
    };
})();