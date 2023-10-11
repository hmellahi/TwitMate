import "./AnimatedLike.scss";

export default function AnimatedLike() {
  return (
    <div>
      <input id="toggle-heart" type="checkbox" />
      <label for="toggle-heart" aria-label="like">
        ❤
      </label>
    </div>
  );
}