import React, { useRef, useEffect } from "react";

const SpaceShooter = () => {
  const canvasRef = useRef(null);
  const player = useRef({
    x: 240,
    y: 550,
    width: 50,
    height: 38,
    speed: 10,
    lives: 3,
    shield: 100,
    power: 1,
    lastShotTime: 0, // For controlling firing rate
    fireRate: 333, // 333ms between shots, which is approximately 3 shots per second
  });
  const bullets = useRef([]);
  const enemies = useRef([]);
  const score = useRef(0);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;

    if (!canvas || !ctx) {
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        player.current.movingLeft = true;
      } else if (e.key === "ArrowRight") {
        player.current.movingRight = true;
      } else if (e.key === " ") {
        player.current.shooting = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft") {
        player.current.movingLeft = false;
      } else if (e.key === "ArrowRight") {
        player.current.movingRight = false;
      } else if (e.key === " ") {
        player.current.shooting = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const gameLoop = () => {
      updateGame();
      drawGame(ctx);
      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const updateGame = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    // Update player position
    if (player.current.movingLeft && player.current.x > 0) {
      player.current.x -= player.current.speed;
    }
    if (
      player.current.movingRight &&
      player.current.x < canvas.width - player.current.width
    ) {
      player.current.x += player.current.speed;
    }

    // Player shooting with controlled fire rate
    if (player.current.shooting) {
      const now = Date.now();
      if (now - player.current.lastShotTime > player.current.fireRate) {
        shoot();
        player.current.lastShotTime = now;
      }
    }

    // Update bullets
    bullets.current = bullets.current.filter((bullet) => bullet.y > 0);
    bullets.current.forEach((bullet) => {
      bullet.y -= bullet.speed;
    });

    // Update enemies
    enemies.current.forEach((enemy) => {
      enemy.y += enemy.speed;
      if (enemy.y > canvas.height) {
        // Enemy goes off screen
        enemies.current = enemies.current.filter((e) => e !== enemy);
      }
    });

    // Check collisions
    checkCollisions();
  };

  const drawGame = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw player
    ctx.fillStyle = "green";
    ctx.fillRect(
      player.current.x,
      player.current.y,
      player.current.width,
      player.current.height
    );

    // Draw bullets
    ctx.fillStyle = "yellow";
    bullets.current.forEach((bullet) => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Draw enemies
    enemies.current.forEach((enemy) => {
      ctx.fillStyle = enemy.color;
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText(`Score: ${score.current}`, 10, 20);

    // Draw lives and shield
    ctx.fillText(`Lives: ${player.current.lives}`, 10, 40);
    ctx.fillText(`Shield: ${player.current.shield}`, 10, 60);
  };

  const shoot = () => {
    bullets.current.push({
      x: player.current.x + player.current.width / 2 - 2,
      y: player.current.y,
      width: 5,
      height: 15,
      speed: 10,
    });
  };

  const spawnEnemyGroup = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const groupSize = Math.floor(Math.random() * 5) + 3; // Random group size between 3 and 7
    const isStrongEnemy = Math.random() < 0.2; // 20% chance for strong enemy group

    for (let i = 0; i < groupSize; i++) {
      enemies.current.push({
        x: i * (canvas.width / groupSize) + 20,
        y: 0,
        width: isStrongEnemy ? 50 : 40,
        height: isStrongEnemy ? 50 : 40,
        speed: Math.random() * 1 + 0.5, // Slower enemy speed
        hitsRequired: isStrongEnemy ? 3 : 1, // Stronger enemies require more hits
        color: isStrongEnemy ? "purple" : "red",
      });
    }
  };

  const checkCollisions = () => {
    bullets.current.forEach((bullet, bIndex) => {
      enemies.current.forEach((enemy, eIndex) => {
        if (
          bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y
        ) {
          // Collision detected
          bullets.current.splice(bIndex, 1);
          enemy.hitsRequired -= 1;

          if (enemy.hitsRequired <= 0) {
            enemies.current.splice(eIndex, 1);
            score.current += enemy.color === "purple" ? 50 : 10;
          }
        }
      });
    });

    // Check collision between player and enemies
    enemies.current.forEach((enemy, eIndex) => {
      if (
        player.current.x < enemy.x + enemy.width &&
        player.current.x + player.current.width > enemy.x &&
        player.current.y < enemy.y + enemy.height &&
        player.current.y + player.current.height > enemy.y
      ) {
        // Collision detected between player and enemy
        player.current.shield -= 20;
        enemies.current.splice(eIndex, 1);
        if (player.current.shield <= 0) {
          player.current.lives -= 1;
          player.current.shield = 100;
          if (player.current.lives <= 0) {
            alert("Game Over");
            resetGame();
          }
        }
      }
    });
  };

  const resetGame = () => {
    player.current = {
      ...player.current,
      x: 240,
      y: 550,
      lives: 3,
      shield: 100,
    };
    bullets.current = [];
    enemies.current = [];
    score.current = 0;
  };

  useEffect(() => {
    const enemyInterval = setInterval(spawnEnemyGroup, 2000);
    return () => clearInterval(enemyInterval);
  }, []);

  return (
    <div
      ref={canvasContainerRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <canvas
        ref={canvasRef}
        width="480"
        height="600"
        style={{ backgroundColor: "black", margin: "auto" }}
      />
    </div>
  );
};

export default SpaceShooter;
