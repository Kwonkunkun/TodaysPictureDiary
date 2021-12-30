import { ref, remove, set } from "firebase/database";
import { firebaseDatabase } from "./firebase";

class PictureDiaryRepository {
  syncCard(userId: string, onUpdate: () => void) {
    const reference = ref(firebaseDatabase, `${userId}/cards`);
  }

  savePictureDiary(userId: string, pictureDiary: PictureDiary) {
    const reference = ref(
      firebaseDatabase,
      `${userId}/pictureDiary/${pictureDiary.id}`
    );
    set(reference, {
      pictureDiary,
    });
  }
  removePictureDiary(userId: string, pictureDiary: PictureDiary) {
    const reference = ref(
      firebaseDatabase,
      `${userId}/pictureDiary/${pictureDiary.id}`
    );
    remove(reference);
  }
}

export default PictureDiaryRepository;
